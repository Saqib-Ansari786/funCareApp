import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Helpfaq = () => {
  const faqData = [
    {
      question: "What is the kids playland app?",
      answer:
        "The kids playland app is a platform that allows parents to book joylands for their kids to enjoy various activities and attractions.",
    },
    {
      question: "How can I book a joyland for my child?",
      answer:
        "To book a joyland for your child, simply navigate to the booking section of the app, select the desired joyland, choose a date and time, and proceed with the booking process.",
    },
    {
      question: "What activities are available at the joylands?",
      answer:
        "The joylands offer a wide range of activities such as slides, swings, trampolines, ball pits, climbing structures, and much more to keep your child entertained and active.",
    },
    {
      question: "Can I bring my own food and drinks?",
      answer:
        "The policy regarding outside food and drinks may vary for each joyland. Some joylands may allow outside food, while others may have restrictions or provide their own food and beverage options. Please check the specific joyland's guidelines or contact their customer support for more information.",
    },
    {
      question: "Is there an age limit for children to enter the joylands?",
      answer:
        "The age limit may vary depending on the joyland and the specific attractions they offer. Some joylands may have designated areas for different age groups, ensuring a safe and enjoyable experience for children of all ages.",
    },
    {
      question: "How can I cancel or reschedule a booking?",
      answer:
        "To cancel or reschedule a booking, go to the 'My Bookings' section of the app, locate the booking you want to modify, and follow the provided instructions to make the changes.",
    },
    {
      question: "Are there any special discounts or offers available?",
      answer:
        "Yes, the kids playland app frequently offers special discounts and promotional offers. Keep an eye on the app's 'Deals' section or subscribe to our newsletter to stay updated on the latest discounts and offers.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "The kids playland app accepts various payment methods such as credit/debit cards, mobile wallets, and cash on arrival. You can choose your preferred payment option during the booking process.",
    },
  ];

  const renderFAQItems = () => {
    return faqData.map((faqItem, index) => (
      <View key={index} style={styles.faqItem}>
        <Text style={styles.question}>Q: {faqItem.question}</Text>
        <Text style={styles.answer}>{faqItem.answer}</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {renderFAQItems()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: "#888888",
  },
});

export default Helpfaq;
