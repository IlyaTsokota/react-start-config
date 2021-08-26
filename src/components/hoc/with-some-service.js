import React from 'react';
import { SomeServiceConsumer } from '../some-service-context';

const withSomeService = () => (Wrapped) => {
    return (props) => {
        return (
            <SomeServiceConsumer>
                {
                    (someService) => {
                        return (<Wrapped {...props}
                            someService={someService} />
                        );
                    }
                }
            </SomeServiceConsumer>
        );
    };
};

export default withSomeService;