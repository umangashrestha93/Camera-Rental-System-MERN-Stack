import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CameraForm } from '../../components/camera/Form'
import { getCamera, updateCamera } from '../../services/api/utils';

export function EditCamera() {
    const [camera, setCamera] = useState([]);
    const { id } = useParams();

    const fetchAndSetCamera = async () => {
        const res = await getCamera(id);
        if (res.status === 200) {
            const data = res?.data?.data;
            setCamera(data);
        }
        return res;
    };

    useEffect(() => {
        fetchAndSetCamera()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CameraForm defaultValues={camera} onSave={(payload) => updateCamera(id, payload)}/>
    )
}