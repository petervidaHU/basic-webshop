import React, { useCallback, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { default as lista } from './../../data/post_automata.json'
import MapPoint from './mapPoint';
import { useDispatch, useSelector } from 'react-redux';
import {
    saveShippingMethod,
    removeShippingAddress,
    saveShippingAddress
} from '../../store/actions/cartActions';
import { Button } from 'rebass/styled-components';
import styled from 'styled-components';
import { saveNewAddress } from './../../store/actions/addressActions';

/*
A postapont data felépítése:
ID: "106452"
ServicePointType: "CS"
city: "Alcsútdoboz"
description: "N/A..."
email: "uzleti.ugyfelszolgalat@posta.hu"
gpsData: {EOVx: "231479", EOVy: "616450", WGSLat: "47,426426", WGSLon: "18,602748"}
isPostPoint: "1"
name: "51 sz. automata - Magyar Takarékszövetkezeti Bank Zrt."
phoneArea: "1-767-8272"
street: {name: "Béke", type: "utca", houseNumber: "1"}
workingHours: {culture: "HU", days: Array(7)}
zipCode: "8087"
*/

const GoogleMap = () => {
    const dotdot = useCallback(lista => {
        lista.post.map(point => point.gpsData.WGSLat = point.gpsData.WGSLat.replace(/,/g, '.'))
        lista.post.map(point => point.gpsData.WGSLon = point.gpsData.WGSLon.replace(/,/g, '.'))
        return lista
    }, [lista]);
    const listaDot = dotdot(lista)

    const addressFromStore = useSelector(state => state.addressSave);
    const { address } = addressFromStore;
    const [editMap, setEditMap] = useState(true)
    const dispatch = useDispatch()
    const [selectedPoint, setSelectedPoint] = useState(null)
    const defaultProps = {
        center: {
            lat: 47.4,
            lng: 19.07
        },
        zoom: 11
    };
    const size = { w: '50%', h: '60vh' };

    useEffect(() => {
        if (address) {
            dispatch(saveShippingAddress(address._id));
        };
    }, [address])

    const handleSelectPoint = (e) => {
        setSelectedPoint(lista.post.find(point => point.ID === e.target.dataset.id));
    };

    const handleEdit = () => {
        dispatch(saveShippingMethod(null))
        dispatch(removeShippingAddress())
        setEditMap(true);
    };

    const handleConfirm = () => {
        const addressToSave = {
            name: `${selectedPoint.ID} -- ${selectedPoint.name}`,
            company: 'MPL_csoamgautomata',
            address_1: `${selectedPoint.street.name} ${selectedPoint.street.type} ${selectedPoint.street.houseNumber}`,
            city: selectedPoint.city,
            postcode: selectedPoint.zipCode,
        };
        dispatch(saveNewAddress(addressToSave));
        dispatch(saveShippingMethod('MPL_automata'))
        setEditMap(false);
    };

    return (<>
        <div>
            {selectedPoint !== null && (<div>
                <p>
                    a kiválasztott automata: {selectedPoint.ID}
                </p>
                <p>
                    neve: {selectedPoint.name}
                </p>
                <p>
                    címe: {selectedPoint.street.name}{' '}
                    {selectedPoint.street.type}{' '}
                    {selectedPoint.street.houseNumber}{' '}
                </p>
                {editMap
                    ? <Button onClick={handleConfirm}>Ezt választom</Button>
                    : <Button onClick={handleEdit}>Módosítom</Button>
                }
            </div>
            )}
        </div>
        {editMap &&
            <MapContainer style={{ height: size.h, width: size.w }}>
                <GoogleMapReact
                    center={defaultProps.center}
                    zoom={defaultProps.zoom}
                    hoverDistance={1}
                >
                    {listaDot.post.map(point => (
                        <MapPoint
                            key={point.ID}
                            id={point.ID}
                            lat={point.gpsData.WGSLat}
                            lng={point.gpsData.WGSLon}
                            text={point.name}
                            selected={selectedPoint?.ID}
                            handler={handleSelectPoint}
                        />
                    ))}
                </GoogleMapReact>
            </MapContainer>
        }
    </>
    )
}

export const MemoizedGoogleMap = React.memo(GoogleMap);

const MapContainer = styled.div`
 
`;