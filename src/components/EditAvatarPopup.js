import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef(); 

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({avatar: avatarRef.current.value});
    }

    return (
        <PopupWithForm 
            name="edit-avatar"
            title="Обновить аватар"
            buttonText="Сохранить" 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText="Загружается..."
        >
            <input ref={avatarRef} type="url" className="form__field" placeholder="Ссылка на картинку" name="avatar-link" required />
            <span className="form__error-message avatar-link-error"></span>
        </PopupWithForm>
  );
}

export default EditAvatarPopup;