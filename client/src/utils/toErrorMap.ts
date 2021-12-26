const toErrorMap = (errors: any) => {
    const res: any = {}
    Object.entries(errors).forEach(([key, value] : [string, any]) => {
        res[key] = value[0].message;
    });
    return res;
}
export default toErrorMap;