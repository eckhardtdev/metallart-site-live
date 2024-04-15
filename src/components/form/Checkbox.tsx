import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export function Checkbox(props) {
  const {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    meta,
    label,
    description,
  } = props

  const id = props.id || field.name
  const invalid = meta.touched && meta.error
  // const invalid = Boolean(meta?.error)
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const errorFieldProps = invalid
    ? {
        'aria-invalid': 'true',
        'aria-describedby': errorId,
      }
    : undefined

  const errorMessage = typeof meta.error === 'string' ? meta.error : undefined

  return (
    <div className="relative flex items-start gap-x-3 md:gap-x-8">
      <div className="flex items-center">
        <input
          id={id}
          aria-describedby={descriptionId}
          type="checkbox"
          className={clsx(
            'h-6 w-6 rounded border border-creme bg-transparent checked:!border-creme checked:!bg-transparent hover:!bg-transparent checked:hover:!border-creme md:h-8 md:w-8',
            '!outline-none',
            'ring-0 checked:ring-0 focus:ring-1 focus:ring-offset-0',
            'focus:ring-offset-transparent',
            !invalid
              ? 'text-creme focus:ring-creme'
              : 'border-error-ring text-error-text focus:ring-error-ring',
          )}
          {...field}
          {...errorFieldProps}
        />
      </div>
      <div>
        <label
          htmlFor={id}
          className={clsx(
            'text-16 leading-125 md:text-24',
            !invalid ? 'text-creme' : 'text-error-text',
            props.hideLabel && 'sr-only',
          )}
        >
          {label}
        </label>
        {description && (
          <div
            id={descriptionId}
            className="prose prose-sm text-creme prose-a:text-creme"
          >
            {description}
          </div>
        )}
        {invalid && errorMessage && (
          <div className="mt-2 text-sm text-error-text" id={errorId}>
            {meta.error}
          </div>
        )}
      </div>
    </div>
  )
}
