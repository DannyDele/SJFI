import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { mockDataStudent } from "../data/mockData";
import '../../assets/styles/TeachersList.css'

function TeachersList() {
  const data = useMemo(() => mockDataStudent, [])


  const columns = [
        {
      header: 'Profile Image', // Update header
      accessorKey: 'profileImage', // Update accessorKey
      footer: 'Profile Image',
    },

  
    
    {
      header: 'Name',
      accessorKey: 'name',
      footer: 'Name'
    },

    {
      header: 'Program',
      accessorKey: 'program',
      footer: 'Program'
    },
    {
      header: 'Course',
      accessorKey: 'course',
      footer: 'Course'
    },
    {
      header: 'Email',
      accessorKey: 'email',
      footer: 'Email'
    },
  ]
      const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()})

  return (
<div className="teachers-list-container">
  <table className="teachers-table">
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} style={{ fontSize: '14px', color: '#4A0808' }}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {cell.column.columnDef.accessorKey === 'profileImage' ? (
                <img
                  src={cell.value} 
                  alt={`${row.original.name}'s Profile`}
                  style={{ width: '50px', height: '50px', backgroundColor: 'grey', borderRadius: '75%' }}
                />
              ) : (
                <span style={{ fontSize: '12px', color: '#4A0808' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

    )
}

export default TeachersList