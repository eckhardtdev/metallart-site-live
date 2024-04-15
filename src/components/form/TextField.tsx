import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export function TextField(props) {
  const {
    field, // { name, value, onChange, onBlur }
    form,
    meta,
    placeholder = '',
    label,
    type = 'text',
    autocomplete,
  } = props

  const id = props.id || field.name
  const dirty = meta.touched && (field.value !== '' || form.submitCount > 0)
  const invalid = dirty && meta.error
  // const invalid = Boolean(meta.error)
  const errorId = `${id}-error`
  const errorFieldProps = invalid
    ? {
        'aria-invalid': 'true',
        'aria-describedby': errorId,
      }
    : undefined

  return (
    <div>
      <div className={clsx('relative w-full')}>
        <div className="relative">
          <input
            className={clsx(
              'peer block w-full pb-1.5 pt-4',
              'border-b border-creme/50 bg-transparent font-sans text-16 font-normal leading-125 text-creme transition-all md:text-24',
              'placeholder:opacity-0 focus:border-creme focus:outline-0 focus:placeholder:opacity-100',
              'outline outline-0 focus:ring-0',
              !invalid
                ? 'placeholder:text-brandgray text-creme'
                : 'pr-10 text-error-text placeholder:text-error-placeholder',
            )}
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autocomplete}
            {...field}
            {...errorFieldProps}
          />
          <label
            htmlFor={id}
            className={clsx(
              'pb-1.5 pt-4',
              'pointer-events-none absolute left-0 top-0 flex h-full w-full select-none !overflow-visible truncate text-16 font-normal leading-125 transition-all md:text-24',
              'origin-top-left',
              'peer-focus:-translate-y-3 peer-focus:scale-50 peer-focus:opacity-50',
              'peer-disabled:text-transparent',
              dirty && '-translate-y-3 scale-50 opacity-50',
              !invalid ? 'text-creme' : 'text-error-text !opacity-100',
            )}
          >
            {label}
          </label>
          <div
            aria-hidden="true"
            className={clsx(
              'absolute bottom-0 block w-full scale-x-0 border-b-2 border-creme transition-transform duration-300',
              'peer-focus:scale-x-100 peer-focus:border-creme',
            )}
          ></div>
        </div>
        {invalid && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
            <ExclamationCircleIcon
              className="h-5 w-5 text-error-icon"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {invalid && (
        <p className="mt-2 text-16 text-error-text" id={errorId}>
          {meta.error}
        </p>
      )}
    </div>
  )
}
