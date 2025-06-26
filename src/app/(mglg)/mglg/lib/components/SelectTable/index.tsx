import { memo, ReactNode, useCallback } from 'react'
import {
  RadioCheckInput,
  RadioCheckInputProps,
} from '@kotorieclair/ktrecl-ui-tools'

type Row = { [key: string]: unknown; index: number }

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
  className = '',
}: Props<T>) {
  const handleSelectRows = useCallback<
    RadioCheckInputProps<number>['onChange']
  >(
    (checked, index) => {
      onSelect(
        checked
          ? [...selectedRows, index]
          : selectedRows.filter((i) => i !== index)
      )
    },
    [selectedRows, onSelect]
  )

  const handleSelectAll = useCallback(() => {
    onSelect(rows.map((r) => r.index))
  }, [onSelect, rows])

  const handleDeselectAll = useCallback(() => {
    onSelect([])
  }, [onSelect])

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
            {rows.map((r) => (
              <tr key={r.index} className="hover:bg-base-200">
                <td className="text-center">
                  <RadioCheckInput
                    type="checkbox"
                    value={r.index}
                    onChange={handleSelectRows}
                    checked={selectedRows.includes(r.index)}
                    className="checkbox checkbox-xs checkbox-primary align-middle"
                  />
                </td>
                {rowRenderer(r)}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSelectAll}
            className={`btn btn-xs btn-soft btn-info ${
              rows.length ? 'border-info' : ''
            }`}
            disabled={!rows.length}
          >
            全選択
          </button>
          <button
            onClick={handleDeselectAll}
            className={`btn btn-xs btn-soft btn-warning ${
              rows.length ? 'border-warning' : ''
            }`}
            disabled={!rows.length}
          >
            全解除
          </button>
        </div>
      </div>
    </div>
  )
}

const _SelectTable = memo(SelectTable) as typeof SelectTable

export { _SelectTable as SelectTable }
export type { Props as SelectTableProps, Row as SelectTableRow }
