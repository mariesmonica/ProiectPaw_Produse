package com.example.proiectpaw_produse.kafka.consumer;

import com.example.proiectpaw_produse.kafka.constants.KafkaConstants;
import com.example.proiectpaw_produse.kafka.model.KafkaModel;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class ConsumerKafka {
    @Payload(required = false)
    @KafkaListener(topics= KafkaConstants.KAFKA_TOPIC, groupId = KafkaConstants.GROUP_ID)
    public void listenToTopic(KafkaModel model){
        System.out.println("Message received is "+ model.toString());
    }
}
