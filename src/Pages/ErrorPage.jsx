import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <Result
                status="404"
                title="404"
                subTitle="Хуудас олдсонгүй."
                extra={
                    <Link to="/">
                        <Button type="primary">Нүүр хуудас руу шилжих</Button>
                    </Link>
                }
            />
        </div>
    );
};

export default ErrorPage;