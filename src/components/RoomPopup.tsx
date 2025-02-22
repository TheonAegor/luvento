import { Room, RoomType } from '../types/room';
import styles from '../styles/RoomPopup.module.css';

interface RoomPopupProps {
    room: Room;
    position: { x: number; y: number };
    onClose: () => void;
}

const roomTypeNames: Record<RoomType, string> = {
    [RoomType.HOTEL_ROOM]: 'Отельный номер',
    [RoomType.APARTMENT]: 'Апартаменты',
    [RoomType.STUDIO]: 'Студия',
    [RoomType.PENTHOUSE]: 'Пентхаус'
};

export function RoomPopup({ room, position, onClose }: RoomPopupProps) {
    return (
        <div 
            className={styles.popup}
            style={{ 
                left: `${position.x}px`, 
                top: `${position.y}px` 
            }}
        >
            <button className={styles.closeButton} onClick={onClose}>×</button>
            <h3>Комната {room.number}</h3>
            <div className={styles.info}>
                <p><strong>Тип:</strong> {roomTypeNames[room.type]}</p>
                <p><strong>Этаж:</strong> {room.floor}</p>
                <p><strong>Базовая цена:</strong> {room.base_price} ₽/ночь</p>
                <p><strong>Рейтинг:</strong> {room.rating}/5</p>
                <p className={styles.description}>{room.description}</p>
            </div>
        </div>
    );
} 