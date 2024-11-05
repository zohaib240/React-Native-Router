import { View, Text ,StyleSheet,  ScrollView, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
// import { ScrollView } from 'react-native-gesture-handler';


interface Item {
  name: string,
  id : number,
  item:number
}


const index = () => {
    const [users, setUsers] = useState<null | []>(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(json =>{
        console.log(json)
        setUsers(json)
    })

        .catch(() => {
            setError(true)
        })
        .finally(() => {
            setLoading(false)
        })
        
    },[])

  return (
   <SafeAreaView>
    <ScrollView>
    <Text>Index</Text>
    {loading && <Text>Loading...</Text>}
    {error && <Text>Error occured</Text>}
    {users && users.map((item: Item)=>{
       
       return(
        <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/${item.id}`)} // Click par navigate ho raha hai user ki ID ke saath
              >
                <View style={styles.item}>
                  <Text style={{ color: 'white' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
       )
            })}
            </ScrollView>
   </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        backgroundColor: 'red',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default index