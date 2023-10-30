export const err = (data=[], status, message) =>
{
    return ({data:data,status:status, message:message});
};