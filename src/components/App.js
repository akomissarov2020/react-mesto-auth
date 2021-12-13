import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import profileAvatarPath from '../images/avatar.png';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [cardIdToBeDeleted, setCardIdToBeDeleted] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({avatar: profileAvatarPath});
  const [cards, setCards] = React.useState([]);
  const [isLoadingSomething, setIsLoadingSomething] = React.useState(false);

  React.useEffect(()=>{
    setIsLoadingSomething(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      setCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleConfirmation(card) {
    setCardIdToBeDeleted({_id: card._id});
    setIsConfirmPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setCardIdToBeDeleted({});
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleUpdateUser(user) {
    setIsLoadingSomething(true);
    api.updateUserInfo(user)
    .then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  function handleUpdateAvatar(user) {
    setIsLoadingSomething(true);
    api.updateAvatar(user)
    .then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  function handleCardLike(card) {
    setIsLoadingSomething(true);
    const hasOwnLike = card.likes.some(like => like._id === currentUser._id);
    (hasOwnLike ? api.deleteLike(card._id) : api.putLike(card._id))
    .then(
      (newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  } 
  
  function handleCardDelete(card) {
    setIsLoadingSomething(true);
    api.deletePhoto(card._id)
    .then(
      () => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false);
    });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoadingSomething(true);
    api.insertNewCard(card)
    .then(
      (newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}  
        onEditAvatar={handleEditAvatarClick} 
        onAddPlace={handleAddPlaceClick} 
        onCardClick={handleCardClick} 
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleConfirmation}
      />
      <Footer />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
        isLoading={isLoadingSomething}
      />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoadingSomething}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateCards={handleAddPlaceSubmit}
        isLoading={isLoadingSomething}
      />
      <ConfirmPopup 
        isOpen={isConfirmPopupOpen} 
        onClose={closeAllPopups} 
        onSubmit={handleCardDelete}
        isLoading={isLoadingSomething}
        cardToDelete={cardIdToBeDeleted}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} 
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
