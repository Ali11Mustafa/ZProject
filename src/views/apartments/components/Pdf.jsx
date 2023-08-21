import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import sadyarLogo from "../../../assets/img/sadyar-2.png";
import KGoranFont from "./fonts/KGoran.ttf";

Font.register({
  family: "KGoran",
  src: KGoranFont,
});

function CustomPage({ children, contractDate }) {
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
      border: "3px solid #548dd4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5px",
      fontSize: "10px",
    },
    content: {
      flex: 1,
      border: "3px solid #8db3e2",
      padding: "10px",
      marginBottom: "5px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      border: "3px solid #8db3e2",
      padding: "15px 40px 5px 40px",
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
        <Image src={sadyarLogo} style={styles.logo} />
      </View>
      <View
        style={{
          border: "3px solid #8db3e2",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <Text style={{ fontSize: "10px", textAlign: "right", padding: "5px" }}>
          {contractDate} بەرواری :
        </Text>
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        <Text>ناونیشان : هەولێر - ڕێگایى مصیف - شارى زێڕین</Text>
      </View>
    </Page>
  );
}

function Pdf({ contractPdfData }) {
  const ownerName = contractPdfData.ownerName;
  const contractDate = contractPdfData.contractDate;
  const totalPaymentPrice = contractPdfData.totalPaymentPrice;
  const pendingPrice = contractPdfData.pendingPrice;
  const phoneNumber = contractPdfData.phoneNumber;
  const apartmentPrice = contractPdfData.apartmentPrice;
  const apartmentNumber = contractPdfData.apartmentNumber;
  const buildingName = contractPdfData.buildingName;
  const floorNumber = contractPdfData.floorNumber;
  const area = contractPdfData.area;
  const buyerCardId = contractPdfData.buyerCardId;
  const buyerAddress = contractPdfData.buyerAddress;

  return (
    <Document>
      <CustomPage contractDate={contractDate}>
        <View style={{ fontSize: "12px" }}>
          <Text style={{ textAlign: "center", marginBottom: "5px" }}>
            گرێبەستی کڕین و فرۆشتنی یەکەی نیشتەجێ
          </Text>
          <Text style={{ marginTop: "10px" }}>
            {contractDate} :ژمارەی گرێبەست:- ڕۆژی گرێبەست
          </Text>
          <Text style={{ marginTop: "5px" }}>یەکەم / لایەنەکان</Text>
          <Text
            style={{
              textAlign: "right",
              marginTop: "5px",
              marginRight: "10px",
            }}
          >
            ١- لایەنی یەکەم :- فرۆشیار )کۆمپانیای سادیار بۆ وەبەرهێهانی
            خانووبەرە(
          </Text>
          <Text style={{ marginRight: "15px" }}>
            .سەرەڕای کارەکانی
            {" ) هێمن حسێن صالح ( "} بەڕێوبەری کۆمپانیای سادیار
          </Text>
          <Text style={{ marginTop: "10px" }}>
            {` ( ${ownerName} ) کڕیار `} لایەنی دووەم :-
          </Text>
          <Text style={{ marginRight: "10px" }}>
            ١- ناوی پڕۆژە: پڕۆژەی شاری پێشەنگ ) زێڕین (
          </Text>
          <Text style={{ marginRight: "10px" }}>
            20{"15"} / {"5"}/ {"28"} لە ڕێکەوتی
            {" ( 224 ) "}٢- ژمارەی مۆڵەتی وەبەرهێنان
          </Text>
          <Text style={{ marginRight: "10px" }}>
            .٣- شوێنی پڕۆژە: پارێزگای هەولێر / سەر ڕێگای مصیف صلاحدین
          </Text>
          <Text style={{ marginTop: "10px" }}>سێیەم: بابەتی گرێبەست</Text>
          <Text style={{ marginRight: "10px" }}>
            ١- لایەنی یەکەم هەڵدەستێت بە فرۆشتی یەکەی نیشتەجێ جۆری )شوقە(
          </Text>
          <View
            style={{
              marginRight: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              justifyContent: "flex-end",
            }}
          >
            <Text> م٢{` ( ${area} )`} بە ڕووبەری</Text>
            <Text> {` ( ${floorNumber} )`} نهۆمی </Text>
            <Text> {` ( ${buildingName} )`} لە باڵەخانەی</Text>
          </View>

          <View
            style={{
              marginRight: "10px",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              justifyContent: "flex-end",
            }}
          >
            <Text>ئەم یەکەیەی کڕی لەلایەنی یەکەم.</Text>
            <Text>{`$${totalPaymentPrice}`}</Text>
            <Text>٢- لایەنی دووەم بەرامبەر بە</Text>
          </View>
          <Text style={{ marginTop: "10px" }}>چوارەم: مەرجەکانی پارەدان</Text>

          <View
            style={{
              marginRight: "10px",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              justifyContent: "flex-end",
            }}
          >
            <Text>دۆلاری ئەمریکی درا بە کۆمپانیا بە کاش.</Text>
            <Text>{`$${totalPaymentPrice}`}</Text>
            <Text>تێبینی / بڕی</Text>
          </View>
          <Text style={{ marginRight: "10px" }}>
            تێبینی / ڕێژەی جێبەجێکردنی کارەکان بە ڕاپۆرتی یەکەی سەرپەرشتیاری
            بەڕێوبەرایەتی گشتی وەبەرهێنانی هەولێر دەبێت.
          </Text>
        </View>
      </CustomPage>
      <CustomPage contractDate={contractDate}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            direction: "rtl",
          }}
        >
          <Text style={{ borderBottom: "1px solid gray" }}>
            پێنجەم:- پابەندبوونی لایەنی یەکەم
          </Text>
          <Text style={{ marginTop: "10px" }}>
            ١- پێویستە لایەنی یەکەم لە دوای 05 رۆژ لە واژووکردنی ئەم گرێبەستە
            دەست بە دروستکردنی یەکەی نیشتەجێکە بکات.
          </Text>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ٢- پێویستە لایەنى یەكەم لە دواى ) 36 ( مانگ لە ئیمزا كردنى ئەم
              گرێبەستە یەكەى نیشتەجێ كە بەتەواوى و بەبێ كەم و كوڕى
            </Text>
            <Text>
              بەپێ ى ئەو نەخشەو مەرجانەى لە لیستى برەكانى یەكەكە ڕادەستى لایەنى
              دووەمى بكات .
            </Text>
          </View>
          <View style={{ marginTop: "10px" }}>
            <Text>
              {" "}
              ٣- لە كاتى دواكەوتنى لایەنى یەكەم لە تەواو كردنى یەكە نیشتەجێیەكە
              پێویستە رۆژانە 1/0001 ى نرخى یەكەكە وەك سزاى
            </Text>
            <Text>
              دواكەوتن بداتە لایەنى دووەم بەومەرجەى كە %5 ى كۆى گشتى نرخى یەكەكە
              تێپەڕ نەكات .
            </Text>
            <Text style={{ marginTop: "10px" }}>
              ٤- لایەنى یەكەم بۆ ماوەى یەك ساڵ بەرپرسیاریەتى چاككردنەوەى كەم و
              كوریەكانى لە ئەستۆ دەگرێت .
            </Text>
          </View>

          <View style={{ marginTop: "10px" }}>
            <Text>
              ٥- لایەنى یەكەم پێویستە دواى تەواو بوونى یەكەنیشتەجێیەكە ، لە
              بەڕێوەبەرایەتى تۆماركردنى خانووبەرە و پەیوەندیەكانى بەناوى
            </Text>
            <Text>
              لایەنى دووەم تۆمار بكات و لە هەمانكاتدا نیشانەى گڵدانەوەش لەسەر
              یەكەكە دابنێت بۆ بەرژەوەندى خۆی تاوەرگرتنى دوا قستى
            </Text>
            <Text> یەكەكە لە لایەنى دووەم .</Text>
          </View>

          <View style={{ marginTop: "10px" }}>
            <Text>
              ٦-لایەنى یەكەم بۆى نیە هیچ دەستكاری سایت پلانى پرۆژەكە بكات دوایى
              ئیمزا كردنى ئەم گرێبەستە بەجۆرێك كاریگەرى سلبى
            </Text>
            <Text>
              لەسەر ئە یەكە نیشتەجێیە هەبێت ، بەپێچەوانەوە لایەنى دووەم بۆى هەیە
              داواى قەرەبوو بكات لە زیانە ماددى و مەعنەویەكان .
            </Text>
          </View>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ٧- پێویستە لەسەر لایەنى یەكەم نرخى یەكە نیشتەجێیەكان دیارى بكات وە
              بۆى نیە نرخى زەوییەكان لەسەر نرخى یەكەنیشتەجێیەكە
            </Text>
            <Text> ئەژمار بكات .</Text>
          </View>
        </View>
      </CustomPage>
      <CustomPage contractDate={contractDate}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            direction: "rtl",
          }}
        >
          <Text style={{ borderBottom: "1px solid gray" }}>
            شەشەم:- پابەندبوونی لایەنی دووەم
          </Text>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ١- لایەنى دووەم لەكاتى هەلوەشاندنەووە , ئەوا پێویستە كە %01 ى نرخى
              یەكە نیشتەجێ یەكە وەك سزا بەرامبەر خەرجیە
            </Text>
            <Text>كارگێریەكان .بدات بەلایەنى یەكەم </Text>
          </View>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ٢- لایەنى دووەم ڕەزامەندى ئەوە دەدات كەوا یەكە نیشتەجێ یەكە
              نیشانەى گلدانەوەى لەسەردابندرێت بۆ بەرژەوەندى لایەنى
            </Text>
            <Text>یەكەم تاكو هەموو قیستەكانى یەكەنیشتەجێ یەكە دەدات.</Text>
          </View>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ٣- لایەنى دووەم خەرجیەكانى بەناوكردنى یەكە نیشتەجێ یەكەى و
              ئەنجامدانى مامەلەكانى بەناوكردن و تۆماركردن و ماندووبونى
            </Text>
            <Text>پارێزەرایەتى لە ئەستۆ دەگرێت .</Text>
            <Text style={{ marginTop: "10px" }}>
              ٤- لایەنى دووەم بۆى نیە دەست لەم گرێبەستە هەڵگرێ بۆ لایەنى سێ یەم
              بەبێ ڕەزامەندى لایەنى یەكەم بەمەرجێك نابێت
            </Text>
            <Text>پارەى ناوگۆرین لە لایەنى دووەم وەربگیرێت .</Text>
          </View>

          <View style={{ marginTop: "10px" }}>
            <Text>
              ٥- لایەنى دووەم بۆى نیە لە پاشە رۆژدادەستكارى نەخشەى یەكەكە بكات
              یان نهۆمى ترى بۆ زیاد بكات بەبێ ڕەزامەندى وەبەرهێنەر
            </Text>
            <Text>
              و بەڕێوە بەرایەتى گشتى وەبەر هێنان و شارەوانى شوێنەكە بەپێچەوانەوە
              بە ) تجاوز ( سەرپیچى ئەژمار دەكرێت و یەكسەر
            </Text>
            <Text> لادەدرێت و تێك دەدرێت بەبێ قەرەبوو كردنەوە .</Text>
          </View>

          <View style={{ marginTop: "10px" }}>
            <Text>
              ٦- لایەنى دووەم بۆى نیە لە ) یەك ( یەكەى نیشتەجێ زیاتر و نابێت تا
              تەواوكردنى یەكەنیشتەجێ یەكەو دانەوەى هەموو قستەكانى
            </Text>
            <Text> یەكەكە بفرۆشێت .</Text>
          </View>
        </View>
      </CustomPage>
      <CustomPage contractDate={contractDate}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            direction: "rtl",
          }}
        >
          <Text style={{ borderBottom: "1px solid gray" }}>
            حەوتەم:- چەند حوکمێکی کۆتایی
          </Text>
          <Text style={{ marginTop: "10px" }}>
            ١- ناونیشانى پێ ڕاگەیاندن ئەو ناو ونیشانە دەبێت كەلەم گرێبەستە دەست
            نیشان كراوە .
          </Text>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ٢- ئەم گرێبەستە و هاوپێچەكانى لە نەخشەو سایت پلانى پرۆژەكە و شوێنى
              یەكەكە لەسەر سایت پلان و نەخشەكانى یەكەكە
            </Text>
            <Text>
              بیناسازى و ئینشاى و میكانیكى و كارەباى و دیزاینى ناوەوە هتد... كە
              لەگەل لیست و بڕ و مواسەفاتى یەكەبەشێكى دانەبڕاوە لەو
            </Text>
            <Text> گرێبەست و لێك جیانابنەوە .</Text>
          </View>
          <View style={{ marginTop: "10px" }}>
            <Text>
              ٣- لەحالەتى ڕوودانى هەر ناكۆكیەك ئەوا سەرەتا بەشێوەیەكى دۆستانە
              چارەسەر دەكرێت ئەگەر نەكرا ئەوسا پەنادەبرێت بۆ دادگا
            </Text>
            <Text> تایبەتمەندیەكانى هەرێمى كوردستان .</Text>
            <Text style={{ marginTop: "10px" }}>
              ٤- ئەم گرێبەستە لە حەوت بەشى سەرەكى پێك هاتووە بەسێ وێنەى ئەسلى و
              كە هێزى یاسای یەكسانیان هەیە لە شارى هەولێر
            </Text>
            <Text>
              ٠٢ ئیمزاکرا.{"      "} / {"      "}/ {"      "}لە ڕێکەوتی
            </Text>
          </View>

          <View
            style={{
              marginTop: "250px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
              }}
            >
              <Text style={{ fontWeight: 700, fontSize: "16px" }}>
                لایەنی یەکەم
              </Text>
              <Text style={{ fontSize: "10px" }}>
                فرۆشیار / بەڕێوبەری ڕێپێدراوی کۆمپانیای سادیار - سەرەڕای
                کارەکانی
              </Text>
              <Text>ژمارەی ناسنامە / </Text>
              <Text>ناونیشان / هەولێر - گوندی ئارام - ڤێلای ژمارە 052</Text>
              <Text>ژ. مۆبایل / 00000980570</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
              }}
            >
              <Text style={{ fontWeight: 700, fontSize: "16px" }}>
                لایەنی دووەم
              </Text>
              <Text style={{}}> {ownerName} کڕیار / </Text>
              <Text style={{}}>{buyerCardId}ژمارەی ناسنامە / </Text>
              <Text style={{}}>{buyerAddress}ناونیشان / هەولێر - </Text>
              <Text style={{}}> {phoneNumber} ژ. مۆبایل /</Text>
            </View>
          </View>
        </View>
      </CustomPage>
    </Document>
  );
}

export default Pdf;
