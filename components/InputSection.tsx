import styles from '../styles/InputSection.module.scss'

interface IInputSection {
  name: string;
  isActive: boolean;
  onToggle: () => void;
  children: JSX.Element | JSX.Element[];
}

const InputSection = ({ name, isActive, onToggle, children }: IInputSection) => {
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
      <label
        className={styles.label}
        onClick={() => onToggle()}
      >
        { name }
      </label>
      <div className={styles.childContainer}>
        { children }
      </div>
    </div>
  )
}

export default InputSection
