import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getUser, updateUser } from '../../services/api/utils';
import { UsersForm } from '../../components/users/Form';
import { normalizeUserEditPayload } from '../../components/users/utils';

export function EditUser() {
    const [user, setUser] = useState([]);
    const { id } = useParams();

    const fetchAndSetUser = async () => {
        const res = await getUser(id);
        if (res.status === 200) {   
            const data = res?.data;
            setUser(data);
        }
        return res;
    };

    useEffect(() => {
        fetchAndSetUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UsersForm defaultValues={user} onSave={(payload) => updateUser(id, normalizeUserEditPayload(payload))} isUserEdit/>
    )
}