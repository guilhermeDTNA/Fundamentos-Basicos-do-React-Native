import { Button, Modal, Text, View } from "react-native";

interface ModalProps{
  openModal: boolean, 
  closeModal: () => void
}

const ModalComponent = ({openModal, closeModal}: ModalProps) => {
  return(
    <Modal transparent={true} visible={openModal} animationType="slide" onRequestClose={closeModal}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 300, height: 300, backgroundColor: 'white', borderRadius: 10}}>
          <Text>Modal</Text>
          <Button title="Fechar" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  )
}

export default ModalComponent;