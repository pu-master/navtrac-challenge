import styles from '../styles/InputField.module.scss'

interface IInputField {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

const InputField = ({ name, label, type = 'text', value, onChange }: IInputField) => (
  <div className={styles.container}>
    <label
      className="form-label"
      htmlFor={name}
    >
      { label }
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="form-control"
      required
      value={value}
      onChange={(event) => { onChange(name, event.target.value) }}
    />
  </div>
)

export default InputField
