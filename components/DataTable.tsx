import * as React from 'react'
import { cn } from '@/lib/utils'

interface DataTableProps {
  data: any[]
  columns: Array<{
    key: string
    label: string
    render?: (value: any, row: any) => React.ReactNode
  }>
  className?: string
}

export function DataTable({ data, columns, className }: DataTableProps) {
  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', className)}>
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-3 text-left text-sm font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index > 0 ? 'border-t' : ''}>
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-3 text-sm">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
