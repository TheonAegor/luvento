import styles from '../styles/TopMenu.module.css';

interface TopMenuProps {
    onAddRoom: () => void;
}

export function TopMenu({ onAddRoom }: TopMenuProps) {
    return (
        <div className={styles.topMenu}>
            <div className={styles.menuLeft}>
                <h1>Управление бронированием</h1>
            </div>
            <div className={styles.menuRight}>
                <button 
                    className={styles.addButton}
                    onClick={onAddRoom}
                >
                    + Добавить объект
                </button>
            </div>
        </div>
    );
} 