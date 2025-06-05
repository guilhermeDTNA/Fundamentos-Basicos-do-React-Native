import notifee, { AndroidImportance, AuthorizationStatus, EventType, RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Notificacoes(){
  const [statusNotification, setStatusNotification] = useState(true);
  const [listNotifications, setListNotifications] = useState<string[]>([]);

  useEffect(() => {
    async function getPermission(){
      const settings = await notifee.requestPermission();
      setStatusNotification(settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED);
    }

    getPermission();
  }, [])

  notifee.onBackgroundEvent(async ({ type, detail}) => {
    const {notification, pressAction} = detail;

    if(type === EventType.PRESS){
      console.log('Tocou na notificação background: ', pressAction?.id);
      if(notification?.id){
        await notifee.cancelNotification(notification?.id);
      }
      
    }

    console.log('Event background');
  })

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch(type){
        case EventType.DISMISSED:
          console.log('Notificação foi descartada', detail.notification);
          break;
        case EventType.PRESS:
          console.log('Notificação foi pressionada', detail.notification);
          break;
      }
    })
  }, [])

  async function handleNotification(){
    if(!statusNotification){
      return;
    }

    // Isso aparece nas configurações do Android, na aba de notificações do app
    const channelId = await notifee.createChannel({
      id: 'lembrete',
      name: 'lembrete',
      vibration: true,
      importance: AndroidImportance.HIGH
    })

    await notifee.displayNotification({
      id: 'lembrete',
      title: 'Deixar de ser burro',
      body: 'Lembre-se de não ser burro',
      android: {
        channelId,
        pressAction:{
          id: 'default',
        }
      }
    })
  }

  async function handleScheduledNotification(){
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP, //enviando uma data
      timestamp: date.getTime()
    }

    await notifee.createTriggerNotification({
      title: 'Como você é burro',
      body: 'Você fala de uma maneira burra',
      android: {
        channelId: 'lembrete',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',

        }
      }
    }, trigger)

    handleSaveNotifications();
  }

  function handleSaveNotifications(){
    notifee.getTriggerNotificationIds().then(ids => {
      console.log('Notificações agendadas: ', ids);
      setListNotifications(ids);
    })
  }

  async function handleCancelNotification(){
    const lastNotification = listNotifications.reverse()?.[0];
    console.log('Última notificação: ', lastNotification);
    lastNotification && await notifee.cancelNotification(lastNotification);
  }

  async function handleScheduleWeekly(){
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.WEEKLY
    }

    await notifee.createTriggerNotification({
      title: 'Busque conhecimento',
      body: 'Busque conhecimento semanalmente',
      android: {
        channelId: 'lembrete',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default'
        }
      }
    }, trigger)
  }

  return(
    <View style={styles.container}>
      <Text>Notificações APP</Text>

      <Button title="Enviar notificação" onPress={handleNotification} />

      <Button title='Agendar notificação' onPress={handleScheduledNotification} />

      <Button title='Listar notificações' onPress={handleSaveNotifications} />

      <Button title='Cancelar notificação' onPress={handleCancelNotification} />

      <Button title='Agendar semanalmente' onPress={handleScheduleWeekly} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10
  }
})