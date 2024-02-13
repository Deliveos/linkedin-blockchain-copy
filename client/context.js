import { createContext, useState, useEffect, useReducer } from 'react';
import Gun from 'gun';

export const AppContext = createContext();

const gun = Gun(['http://localhost:9876', 'http://localhost:9875']);

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    checkIfWalletIsConnected()
  }, []);

  useEffect(async () => {
    if (!account) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getCurrentUserData?account=${account}`,
      )

      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }, [account])

  const createUserAccount = async (userAddress = account) => {
    if (!window.ethereum) return

    try {
      const data = {
        userAddress: userAddress,
      }

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } catch (error) {
        console.error(error)
      }

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createdm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } catch (error) {
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setAccount(addressArray[0])
        createUserAccount(addressArray[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        account,
        gun,
        connectWallet,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}