import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import {useState} from "react";
import ImagePopup from "./ImagePopup";
import React from "react";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as siteAuth from "../utils/siteAuth";

function App() {

  const [isEditAvatarPopupOpen, setAvatarModalIsOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileModalIsOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setNewCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api.getUserData()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setNewCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleEditAvatarClick = () => {
    setAvatarModalIsOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfileModalIsOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlaceModalIsOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleAddPlaceSubmit = (card) => {
    api.addCard(card)
      .then((newCard) => {
        setNewCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setNewCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setNewCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const closeAllPopups = () => {
    setAvatarModalIsOpen(false);
    setEditProfileModalIsOpen(false);
    setAddPlaceModalIsOpen(false);
    setSelectedCard(null)
  }

  const handleUpdateUser = (data) => {
    api.editProfile(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      siteAuth.checkToken(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
          }
        })
    }
  }

  React.useEffect(() => {
    handleToken()
  },[])

  React.useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn])

  console.log(loggedIn)

  const handleLogin = ({password, email}) => {
    siteAuth.signIn({password, email})
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        handleToken()
      })
  }

  const handleRegister = ({password, email }) => {
    siteAuth.signUp({password, email})
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header/>
          <Switch>
            <Route path='/sign-in'>
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route path='/sign-up'>
              <Register handleRegister={handleRegister}/>
            </Route>
            <ProtectedRoute exact path='/'
                            loggedIn={loggedIn}
                            component={Main}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}/>
            <Route>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in'/>}
            </Route>
          </Switch>
          <Footer/>
          {/*Popup Edit Profile*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/*Add card popup*/}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/*Окно фото*/}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            name="open-photo"
          />
          {/*Окно удаления карточки*/}
          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            button="Да"
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
