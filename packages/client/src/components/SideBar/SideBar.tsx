import { useEffect, useState } from 'react'
import { Input } from 'antd'

import Tree from './Tree'
import { createDB } from '../modals'
import { logout } from '@/request/index'

import './SideBar.styl'
import logoUrl from '@/assets/logo.png'
import { dispatch, select } from '@/reducers'
import type { sidebarTreeItemType } from '@/global/types'
import { useNav } from '@/router/navigate'

export default function SideBar() {
  // let dbAndCol = useContext(dbAndColContext);
  const { dbAndCol, activeDb, activeCol } = select('dbAndCol', 'activeDb', 'activeCol')
  const { goDb, goCol, goLogin, goDatabases } = useNav()

  function goToDataBases() {
    goDatabases()
  }
  const [treeData, settreeData] = useState<sidebarTreeItemType[]>([])
  useEffect(() => {
    if (dbAndCol != null) {
      // console.log("handle dbAndCol", treeData);

      const tree: sidebarTreeItemType[] = []

      const dbs = Object.keys(dbAndCol)
      for (const db of dbs) {
        tree.push({
          dbName: db,
          key: [db],
          cols: dbAndCol[db].collections.map((item) => ({
            colName: item.name,
            key: [db, item.name]
          }))
        })
      }
      settreeData(tree)
    }
  }, [dbAndCol])
  function handleSelect(arr: [string, string | null]) {
    if (arr[1]) {
      // 更新表名
      goCol(arr[0], arr[1])
    } else {
      goDb(arr[0])
    }
  }
  function logOut() {
    localStorage.removeItem('jwt')
    logout()
      .then((res) => {
        dispatch('init', {
          isLogin: false
        })
        goLogin()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="sideBar">
      <div className="head">
        <img src={logoUrl} alt="logo" className="logo" />
        <div className="host">{location.hostname}:27017</div>
        <i className="iconfont icon-dengchu" onClick={logOut}></i>
      </div>
      <div className="content">
        <div className={'dbs ' + (activeDb == null && activeCol == null ? 'selected' : '')}>
          <i className="iconfont icon-shujuku normal-icon"></i>
          <div className="name" onClick={goToDataBases}>
            databases
          </div>
          <i className="iconfont icon-jia normal-icon" onClick={createDB}></i>
        </div>
        <Input placeholder="Search" />
        <Tree treeData={treeData} onSelect={handleSelect} />
      </div>
    </div>
  )
}
