const makeRequest = ({
  url='/',
  method='get',
  params={},
  data={},
  headers={},
}) => {
  return fetch(url,{
    method,
    ...params,
    data,
    headers
  })
}
  
export default makeRequest
