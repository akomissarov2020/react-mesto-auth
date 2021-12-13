import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const nameRef = React.useRef(); 
    const linkRef = React.useRef(); 

    React.useEffect(() => {
        nameRef.current.value = "";
        linkRef.current.value = "";
    }, [props.isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCards({name: nameRef.current.value,
            link: linkRef.current.value});
    } 

    return (
        <PopupWithForm 
            name="add-place" 
            title="Новое место" 
            buttonText="Создать" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText="Загружается..."
        >
            <input ref={nameRef} type="text" className="form__field" placeholder="Название" name="add-place-name" required minLength="2" maxLength="30" />
            <span className="form__error-message add-place-name-error"></span>
            <input ref={linkRef} type="url" className="form__field" placeholder="Ссылка на картинку" name="add-place-link" required />
            <span className="form__error-message add-place-link-error"></span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;