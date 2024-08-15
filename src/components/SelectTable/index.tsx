import { memo, ReactNode, useCallback } from 'react'
import { RadioCheckInput, RadioCheckInputProps } from '../RadioCheckInput'

type Row = { [key: string]: unknown }

type Props<T extends Row> = {
  title: string
  headers: ReactNode
  rows: T[]
  rowRenderer: (row: T) => ReactNode
  selectedRows: number[]
  onSelect: (selected: number[]) => void
  className?: string
}

function SelectTable<T extends Row>({
  title,
  headers,
  rows,
  rowRenderer,
  selectedRows,
  onSelect,
  className,
}: Props<T>) {
  const handleSelectRows: RadioCheckInputProps<number>['onChange'] =
    useCallback(
      (index, checked) => {
        onSelect(
          checked
            ? [...selectedRows, index]
            : selectedRows.filter((i) => i !== index)
        )
      },
      [selectedRows, onSelect]
    )

  return (
    <div className={className}>
      <div className="badge badge-md badge-accent mb-2">{title}</div>
      <div className="p-3 md:ml-4 bg-base-100 rounded">
        <table className="table table-xs border-y-2 border-base-200">
          <thead>
            <tr>
              <td className="w-14 text-center">選択</td>
              {headers}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="hover">
                <td className="text-center">
                  <RadioCheckInput
                    type="checkbox"
                    value={i}
                    onChange={handleSelectRows}
                    checked={selectedRows.includes(i)}
                    className="checkbox checkbox-xs checkbox-primary align-middle"
                  />
                </td>
                {rowRenderer(r)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const _SelectTable = memo(SelectTable) as typeof SelectTable

export { _SelectTable as SelectTable }
export type { Props as SelectTableProps }
