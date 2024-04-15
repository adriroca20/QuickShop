import jwt from 'jsonwebtoken'

const getToken = (userId) => {
    const token = jwt.sign({
        _id: userId
    }, "ROCAFULLGROUPSECRET123",
    )
    return token;
}

export default getToken;