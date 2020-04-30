import React, {useContext, useState} from 'react';
import { Redirect } from 'react-router-dom';

import { EstatesContext } from '../context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';

import Form from '../../shared/components/Form/Form';
import estateValidationSchema from '../components/Form/EstateValidationSchema';
import addEstateInitState from '../components/Form/addEstate/addEstateInitState';

import Card from '../../shared/components/Card/Card';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';
import Wrapper from '../../shared/components/Wrapper/Wrapper';

const AddEstate = () => {
    const { addEstate } = useContext(EstatesContext);
    const { userData, status: [, setStatus], loading: [isLoading, setIsLoading] } = useContext(UserContext);
    const [isRedirect, setIsRedirect] = useState(false);

    const getOwner = () => {
       return userData.id ? userData.id : '';
    };
    const getPhone = () => {
        return userData.phone ? userData.phone : ''
    };

    const createEstate = async (values) => {
        setIsLoading(true);
        try {
            await addEstate({
                owner: getOwner(),
                email: userData.email,
                phone: getPhone(),
                ...values
            });
        } catch (err) { setStatus('Something went wrong') }
        setIsLoading(false);
        setIsRedirect(true);
    };

    return (
        <> 
            { isRedirect ? <Redirect to="/estates" /> : null }
            { isLoading
                ?   <Center> <Loader /> </Center>
                :   <Wrapper>
                        <Card title="Add new estate">
                            <Form 
                                submitAction={createEstate}
                                validationSchema={estateValidationSchema}
                                initState={addEstateInitState}
                                fileUpload={{name: 'images', multiple: true}}
                            />
                        </Card>
                    </Wrapper>
            }
        </>
     );
}
 
export default AddEstate;