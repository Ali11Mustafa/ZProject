import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import KGoranFont from "../../../assets/fonts/KGoran.ttf";
import hirari from "../../../assets/img/hirari-co.png";

Font.register({
  family: "KGoran",
  src: KGoranFont,
});

function CustomPage({ children }) {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      color: "black",
      padding: "10px",
      fontFamily: "KGoran",
      textAlign: "right",
      fontSize: "12px",
      direction: "rtl",
    },
    footer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5px",
      fontSize: "10px",
    },
    content: {
      flex: 1,
      padding: "10px",
      marginBottom: "5px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: "10px 20px",
      fontWeight: 700,
    },
    logo: {
      width: "100%",
      transform: "scale(1.1)",
    },
  });

  return (
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image src={hirari} style={styles.logo} />
      </View>
      <View style={styles.content}>{children}</View>
    </Page>
  );
}

function Reciept({ recieptData }) {
  const id = recieptData?.invoice_id;
  const invoice_price = recieptData?.invoice_price;
  const invoice_date = recieptData?.invoice_date;
  const para_dar_name = recieptData?.para_dar_name;
  const para_wargr_name = recieptData?.para_wargr_name;
  const invoice_remaining_price = recieptData?.invoice_remaining_price;
  const item_name = recieptData?.item_name;

  return (
    // <PDFViewer>
    <Document>
      <CustomPage>
        <View>
          {" "}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#3f4fa2`,
              color: "white",
              fontWeight: "black",
            }}
          >
            <Text>{id}ژمارەی گرێبەست #</Text>
            <Text>پسوولە</Text>
            <Text>{invoice_date}بەروار: </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Recipient:</Text>
            <Text>{para_wargr_name}</Text>
            <Text>وەرگر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#e5e5f3`,
              color: "black",
            }}
          >
            <Text>Amount:</Text>
            <Text>{invoice_price}$</Text>
            <Text>بڕی پارە:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Remain:</Text>
            <Text>{invoice_remaining_price}$</Text>
            <Text> پارە ماوە:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#e5e5f3`,
              color: "black",
            }}
          >
            <Text>For:</Text>
            <Text>{item_name}</Text>

            <Text>لە بڕی:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Payer:</Text>
            <Text>{para_dar_name}</Text>
            <Text>پارەدەر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#e5e5f3`,
              color: "black",
            }}
          >
            <Text>Payer’s Signiture:</Text>
            <Text>واژووی پارەدەر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Recipient’s Signiture:</Text>
            <Text>واژووی پارە وەرگر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              color: "black",
            }}
          >
            <Text>075089000000</Text>
            <Text>Erbil, Zerin City</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              width: "100%",
              border: "1px dashed gray",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          ></Text>
        </View>
        <View>
          {" "}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#3f4fa2`,
              color: "white",
              fontWeight: "black",
            }}
          >
            <Text>{id}ژمارەی گرێبەست #</Text>
            <Text>پسوولەی پارە وەرگرتن</Text>
            <Text>{invoice_date}بەروار: </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Recipient:</Text>
            <Text>{para_wargr_name}</Text>
            <Text>وەرگر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#e5e5f3`,
              color: "black",
            }}
          >
            <Text>Amount:</Text>
            <Text>{invoice_price}$</Text>
            <Text>بڕی پارە:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Remain:</Text>
            <Text>{invoice_remaining_price}$</Text>
            <Text> پارە ماوە:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#e5e5f3`,
              color: "black",
            }}
          >
            <Text>For:</Text>
            <Text>{item_name}</Text>
            <Text>لە بڕی:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Payer:</Text>
            <Text>{para_dar_name}</Text>
            <Text>پارەدەر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#e5e5f3`,
              color: "black",
            }}
          >
            <Text>Payer’s Signiture:</Text>
            <Text>واژووی پارەدەر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: `#d3d3f3`,
              color: "black",
            }}
          >
            <Text>Recipient’s Signiture:</Text>
            <Text>واژووی پارە وەرگر:</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              color: "black",
            }}
          >
            <Text>0750 890 00 00</Text>
            <Text>Erbil, Zerin City</Text>
          </View>
        </View>
      </CustomPage>
    </Document>
    // </PDFViewer>
  );
}

export default Reciept;
