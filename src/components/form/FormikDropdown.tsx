import { useField, useFormikContext } from 'formik'
import { Dropdown } from './Dropdown'

export function FormikDropdown(props) {
  const name = props.name
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (value) => {
    setFieldValue(name, value)
  }

  return (
    <Dropdown
      label={props.label}
      options={props.options}
      value={field.value}
      onChange={handleChange}
      meta={meta}
      hideLabel={props.hideLabel}
    />
  )
}
