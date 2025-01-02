import React, { useEffect, useState, Fragment, useCallback } from 'react'
import axios from 'axios'
import Navbars from './Navbars';
import Table from './Custom/Table';
import { userRolesList, getTestingOffice, userList } from '../Api/UserApi';
import Select from './Custom/Select';
import { useSelector } from 'react-redux';

const User = () => {

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([])
  const [selectOption, setSelectOption] = useState(null)
  // console.log(selectOption)
  const [filterData, setFilterData] = useState([])
  // console.log(filterData)
  const token = localStorage.getItem('token');
  // console.log(token)
  // console.log(testing)
  const columns = [
    {
      selector: (info) => info.UserName,
      name: "UserName",
      grow: 2,
      sortable: true,
    },
    {
      selector: (info) => info.FirstName,
      name: "FirstName",
      grow: 2,
      sortable: true,
    },
    {
      selector: (info) => info.LastName,
      name: "LastName",
      grow: 2,
      sortable: true,
    },
    {
      selector: (info) => info.Email,
      name: "Email",
      grow: 2,
      sortable: true,
    },
    {
      selector: (info) => info.Phone,
      name: "Phone",
      grow: 2,
      sortable: true,
    },
    {
      name: "Testing Office",
      grow: 2,
      selector: (info) => info.TestingOffice?.TestingOfficeName,
      sortable: true,
      sortField: "Testing Office",
    },
    {
      name: "Group",
      grow: 2,
      selector: (info) => info.UserGroupName,
      sortable: true,
      sortField: "UserGroupName",
    },
    {
      name: "Roles",
      grow: 2,
      selector: (info) => info.UserRolesName?.RoleName,
      sortable: true,
      sortField: "Roles",
    },
  ]

  const callData = useCallback(async () => {
    await userList(
      token,
      `?$count=true&$expand=UserRolesName($select=RoleName),TestingOffice($select=TestingOfficeName)`
    )
      .then((data) => {
        // console.log(data)
        setData(data?.value)
        setFilterData(data?.value)
      })
      .catch((error) => console.log(error))
  }, [])

  async function getTestingOfficeOptions() {
    await getTestingOffice(
      token,
      `?$select=TestingOfficeName,Id,isActive`
    )
      .then((data) => {
        // console.log(data)
        setOptions(data?.value.map((role) => ({ value: role.RoleName, label: role.RoleName })));
      })
      .catch((error) => console.log(error))
  }

  async function getUserRole() {
    await userRolesList(token)
      .then((data) => {
        setOptions(data?.value);
        // console.log(data?.value)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    callData()
    // getTestingOfficeOptions()
    getUserRole()

  }, [])

  useEffect(() => {
    if (selectOption) {
      const filtered = data.filter((user) => user.UserRolesName?.RoleName === selectOption);
      // console.log(filtered)
      setFilterData(filtered);
    } else {
      setFilterData(data);
    }
  }, [selectOption, data]);


  return (
    <Fragment>
      <Navbars />
      <Select
        value={options}
        selectOption={selectOption}
        onChange={(e) => {
          setSelectOption(e.target.value)
        }}
      />
      <div className='flex justify-center items-center text-black'>
        <div className='w-75 rounded flex justify-center items-center bg-white border shadow p-4'>
          <Table
            data={filterData}
            columns={columns}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default User
