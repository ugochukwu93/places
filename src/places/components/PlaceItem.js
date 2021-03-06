import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';
import Button from '../../shared/components/FormElements/Button'
import Map from '../../shared/components/UIElements/Map'
import { AuthContext } from '../../shared/context/auth-content';

const PlaceItem = props => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [showMap, setShowMap] = useState(false)
  

  //arrow functions
  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)
  const openDeleteConfirmModal = () => setShowDeleteConfirmModal(true)
  const closeDeleteConfirmModal = () => setShowDeleteConfirmModal(false)

  const confirmDeleteHandler=()=> {
    setShowDeleteConfirmModal(false)
    console.log("deleting...")
  }
  const auth = useContext(AuthContext);
  return (
    
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-action"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16}/>
        </div>
      </Modal>
      <Modal
        show={showDeleteConfirmModal}
        onCancel={closeDeleteConfirmModal}
        header="Are you sure"
        footerClass="place-item_modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteConfirmModal}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place? Please note that it cant be undone thereafter.</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
            <Button danger onClick={openDeleteConfirmModal}>DELETE</Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
