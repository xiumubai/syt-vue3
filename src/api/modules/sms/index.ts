import request from "@/api/request"


export const sendCode = (phoneNumber:string) =>{
  return request<any,string>({
    url: `/api/sms/send/${phoneNumber}`,
    method: `get`,
  });
}
