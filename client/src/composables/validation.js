import { ref } from "vue";

export default async function  useFormValidation(userData) {
  const error = ref({});

  const validate = () => {
    if (!window.ethereum) return ("U DUMB")
      try {
        // const addressArray = await window.ethereum.request({
          const addressArray = window.ethereum.request({
          method: 'eth_requestAccounts',
        })

        if (addressArray.length > 0) {
          setAccount(addressArray[0])
          createUserAccount(addressArray[0])
        }
      } catch (error) {
        console.error(error)
      }
  };
  
  return {
    validate,
  };
}
