import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Fragment } from 'react'

export function Dropdown(props) {
  const labelsByValue = props?.options?.reduce((acc, option) => {
    acc[option.value] = option.label
    return acc
  }, {})

  const invalid = Boolean(props?.meta?.error)
  const id = props?.id ?? props?.name
  const errorId = id ? `${id}-error` : undefined
  // const errorFieldProps = invalid
  //   ? {
  //       'aria-invalid': 'true',
  //       'aria-describedby': errorId,
  //     }
  //   : undefined
  const dirty = props?.value !== ''

  return (
    <div className="relative">
      <Listbox value={props?.value} onChange={props?.onChange}>
        {({ open }) => (
          <>
            {!props?.hideLabel && props?.label && (
              <Listbox.Label
                className={clsx(
                  'pb-1.5 pt-4',
                  'pointer-events-none absolute left-0 top-0 flex h-full w-full select-none !overflow-visible truncate text-16 font-normal leading-125 transition-all md:text-24',
                  'origin-top-left',
                  'peer-focus:-translate-y-3 peer-focus:scale-50 peer-focus:opacity-50',
                  'peer-disabled:text-transparent',
                  (open || dirty) && '-translate-y-3 scale-50 opacity-50',
                  !invalid ? 'text-creme' : 'text-error-text !opacity-100',
                )}
              >
                {props?.label}
              </Listbox.Label>
            )}
            <div className="relative mt-2">
              <Listbox.Button
                className={clsx(
                  'peer block w-full pb-1.5 pt-4',
                  'border-b border-creme/50 bg-transparent text-left font-sans text-16 font-normal leading-125 text-creme transition-all md:text-24',
                  'placeholder:opacity-0 focus:border-creme focus:outline-0 focus:placeholder:opacity-100',
                  'outline outline-0 focus:ring-0',
                  'box-content min-h-[1.875rem]',
                  !invalid
                    ? 'placeholder:text-brandgray text-creme'
                    : 'pr-10 text-error-text placeholder:text-error-placeholder',
                )}
              >
                <span className="block truncate">
                  {labelsByValue[props?.value] === props?.label
                    ? ''
                    : labelsByValue[props?.value]}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className={clsx(
                      'h-5 w-5',
                      !invalid ? 'text-creme' : 'text-error-icon',
                    )}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-creme py-1 text-14 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:text-16">
                  {props?.options?.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        clsx(
                          option.disabled && 'opacity-50',
                          active && !option.disabled
                            ? 'bg-white text-body'
                            : 'text-body',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          'hovers:transition-colors hovers:hover:bg-white',
                        )
                      }
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={clsx(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                'absolute inset-y-0 right-0 flex items-center pr-4 text-body',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {invalid && (
        <p className="mt-2 text-sm text-red-600" id={errorId}>
          {props?.meta?.error}
        </p>
      )}
    </div>
  )
}
