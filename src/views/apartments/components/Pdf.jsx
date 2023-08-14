import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    Font,
  } from "@react-pdf/renderer";
  
  import sadyarLogo from "../../../assets/img/sadyar-2.png";
  
  import robotoFont from "./fonts/Roboto-Regular.ttf";
  import notoRegularFont from "./fonts/NotoNaskhArabic-Regular.ttf";
  import notoBoldFont from "./fonts/NotoNaskhArabic-Bold.ttf";
  import { usePdfStore } from "../../../App";
  
  function CustomPage({ children, contractDate }) {
    Font.register({
      family: "Roboto",
      src: robotoFont,
    });
  
    Font.register({
      family: "Noto Naskh Arabic",
      fonts: [
        { src: notoRegularFont, fontWeight: 400 },
        { src: notoBoldFont, fontWeight: 700 },
      ],
    });
  
    const styles = StyleSheet.create({
      page: {
        backgroundColor: "white",
        color: "black",
        padding: "10px",
        fontFamily: "Noto Naskh Arabic",
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
          {/* <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "18px", color: "#4ca3c8" }}>
              Sadyar Company
            </Text>
            <Text style={{ fontFamily: "Roboto", fontSize: "8px" }}>
              For Real Estate Investment
            </Text>
          </View> */}
          <Image src={sadyarLogo} style={styles.logo} />
          {/* <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "18px", color: "#4ca3c8" }}>
              کۆمپانیای سادیار
            </Text>
            <Text style={{ fontSize: "8px" }}>بۆ وەبەرهێنانی خانووبەرە</Text>
          </View> */}
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
          <Text>ناونيشان : هەولێر - ڕێگایى مصيف - شارى زێڕين</Text>
        </View>
      </Page>
    );
  }
  
  function Pdf() {
    const pdfStore = usePdfStore();
  
    const owner = pdfStore.owner;
    const contractDate = pdfStore.contractDate;
    const total = pdfStore.total;
    const phoneNumber = pdfStore.phoneNumber;
    const building = pdfStore.building;
    const floor = pdfStore.floor;
    const area = pdfStore.area;
    const buyerAddress = pdfStore.buyerAddress;
    const buyerIdNumber = pdfStore.buyerIdNumber;

  
    const styles = StyleSheet.create({
      viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  
    return (
      <PDFViewer style={styles.viewer}>
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
                {` ( ${owner} ) کڕیار `} لایەنی دووەم :-
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
                <Text> {` ( ${floor} )`} نهۆمی </Text>
                <Text> {` ( ${building} )`} لە باڵەخانەی</Text>
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
                <Text>{`$${total}`}</Text>
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
                <Text>{`$${total}`}</Text>
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
                دەست بە روستکردنی یەکەی نیشتەجێکە بکات.
              </Text>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٢- ثيَويستة لايةنى يةكةم لة دواى 36 مانط لة ئيمزا كردنى ئةم
                  طريَبةستة يةكةى نيشتةجىَ كة بةتةواوى و بةبىَ كةم و كورِى
                </Text>
                <Text>
                  بةثىَ ى ئةو نةخشةو مةرجانةى لة ليستى برةكانى يةكةكة رِادةستى
                  لايةنى دووةمى بكات .
                </Text>
              </View>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  {" "}
                  ٣- لة كاتى دواكةوتنى لايةنى يةكةم لة تةواو كردنى يةكة
                  نيشتةجيَيةكة ثيَويستة رؤذانة 1/0001 ى نرخى يةكةكة وةك سزاى
                </Text>
                <Text>
                  دواكةوتن بداتة لايةنى دووةم بةومةرجةى كة %5 ى كؤى طشتى نرخى
                  يةكةكة تيَثةرِ نةكات .
                </Text>
                <Text style={{ marginTop: "10px" }}>
                  ٤- لايةنى يةكةم بؤ ماوةى يةك سالَ بةرثرسياريةتى ضاككردنةوةى كةم
                  و كوريةكانى لة ئةستؤ دةطريَت .
                </Text>
              </View>
  
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٥- لايةنى يةكةم ثيَويستة دواى تةواو بوونى يةكةنيشتةجيَيةكة ، لة
                  بةرِيَوةبةرايةتى تؤماركردنى خانووبةرة و ثةيوةنديةكانى بةناوى
                </Text>
                <Text>
                  لايةنى دووةم تؤمار بكات و لة هةمانكاتدا نيشانةى طلَدانةوةش لةسةر
                  يةكةكة دابنيَت بؤ بةرذةوةندى خؤي تاوةرطرتنى دوا قستى
                </Text>
                <Text> يةكةكة لة لايةنى دووةم .</Text>
              </View>
  
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٦-لايةنى يةكةم بؤى نية هيض دةستكاري سايت ثلانى ثرؤذةكة بكات
                  دوايى ئيمزا كردنى ئةم طريَبةستة بةجؤريَك كاريطةرى سلبى
                </Text>
                <Text>
                  لةسةر ئة يةكة نيشتةجيَية هةبيَت ، بةثيَضةوانةوة لايةنى دووةم بؤى
                  هةية داواى قةرةبوو بكات لة زيانة ماددى و مةعنةويةكان .
                </Text>
              </View>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٧- ثيَويستة لةسةر لايةنى يةكةم نرخى يةكة نيشتةجيَيةكان ديارى
                  بكات وة بؤى نية نرخى زةوييةكان لةسةر نرخى يةكةنيشتةجيَيةكة
                </Text>
                <Text> ئةذمار بكات .</Text>
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
                  ١- لايةنى دووةم لةكاتى هةلوةشاندنةووة , ئةوا ثيَويستة كة %01 ى
                  نرخى يةكة نيشتةجىَ يةكة وةك سزا بةرامبةر خةرجية كارطيَريةكان
                </Text>
                <Text> .بدات بةلايةنى يةكةم</Text>
              </View>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٢- ثلايةنى دووةم رِةزامةندى ئةوة دةدات كةوا يةكة نيشتةجيَ يةكة
                  نيشانةى طلدانةوةى لةسةردابندريَت بؤ بةرذةوةندى لايةنى
                </Text>
                <Text>يةكةم تاكو هةموو قيستةكانى يةكةنيشتةجىَ يةكة دةدات.</Text>
              </View>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٣- لايةنى دووةم خةرجيةكانى بةناوكردنى يةكة نيشتةجىَ يةكةى و
                  ئةنجامدانى مامةلةكانى بةناوكردن و تؤماركردن و ماندووبونى
                </Text>
                <Text>ثاريَزةرايةتى لة ئةستؤ دةطريَت .</Text>
                <Text style={{ marginTop: "10px" }}>
                  ٤- لايةنى دووةم بؤى نية دةست لةم طريَبةستة هةلَطرىَ بؤ لايةنى
                  سيَ يةم بةبىَ رِةزامةندى لايةنى يةكةم بةمةرجيَك نابيَت
                </Text>
                <Text>ثارةى ناوطؤرين لة لايةنى دووةم وةربطيريَت .</Text>
              </View>
  
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٥- لايةنى دووةم بؤى نية لة ثاشة رؤذدادةستكارى نةخشةى يةكةكة بكات
                  يان نهؤمى ترى بؤ زياد بكات بةبىَ رِةزامةندى وةبةرهيَنةر و
                </Text>
                <Text>
                  بةرِيَوة بةرايةتى طشتى وةبةر هيَنان و شارةوانى شويَنةكة
                  بةثيَضةوانةوة بة ) تجاوز ( سةرثيضى ئةذمار دةكريَت و يةكسةر
                </Text>
                <Text> لادةدريَت و تيَك دةدريَت بةبىَ قةرةبوو كردنةوة .</Text>
              </View>
  
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٦- لايةنى دووةم بؤى نية لة ) يةك ( يةكةى نيشتةجيَ زياتر و نابيَت
                  تا تةواوكردنى يةكةنيشتةجىَ يةكةو دانةوةى هةموو قستةكانى
                </Text>
                <Text> يةكةكة بفرؤشيَت .</Text>
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
                ١- ناونيشانى ثىَ رِاطةياندن ئةو ناو ونيشانة دةبيَت كةلةم طريَبةستة
                دةست نيشان كراوة .
              </Text>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٢- ئةم طريَبةستة و هاوثيَضةكانى لة نةخشةو سايت ثلانى ثرؤذةكة و
                  شويَنى يةكةكة لةسةر سايت ثلان و نةخشةكانى يةكةكة
                </Text>
                <Text>
                  بيناسازى و ئينشاى و ميكانيكى و كارةباى و ديزاينى ناوةوة هتد...
                  كة لةطةل ليست و برِ و مواسةفاتى يةكةبةشيَكى دانةبرِاوة لةو
                </Text>
                <Text> طريَبةست و ليَك جيانابنةوة .</Text>
              </View>
              <View style={{ marginTop: "10px" }}>
                <Text>
                  ٣- لةحالةتى رِوودانى هةر ناكؤكيةك ئةوا سةرةتا بةشيَوةيةكى
                  دؤستانة ضارةسةر دةكريَت ئةطةر نةكرا ئةوسا ثةنادةبريَت بؤ دادطا
                </Text>
                <Text> تايبةتمةنديةكانى هةريَمى كوردستان .</Text>
                <Text style={{ marginTop: "10px" }}>
                  ٤- ئةم طريَبةستة لة حةوت بةشى سةرةكى ثيَك هاتووة بةسىَ ويَنةى
                  ئةسلى و كة هيَزى ياساي يةكسانيان هةية لة شارى هةوليَر
                </Text>
                <Text>
                  ٠٢ ئیمزاکرا.{"      "} / {"      "}/ {"      "}لە ڕێکەوتی
                </Text>
              </View>
  
              <View
                style={{
                  marginTop: "200px",
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
                  <Text>ژمارەی ناسنامە: </Text>
                  <Text>ناونیشان / هەولێر-گوندی ئارام</Text>
                  <Text>ژ. مۆبایل:</Text>
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
                  <Text style={{}}> {owner} کڕیار: </Text>
                  <Text style={{}}>{buyerIdNumber}ژمارەی ناسنامە: </Text>
                  <Text style={{}}>{buyerAddress}ناونیشان / هەولێر - </Text>
                  <Text style={{}}> {phoneNumber} ژ. مۆبایل:</Text>
                </View>
              </View>
            </View>
          </CustomPage>
        </Document>
      </PDFViewer>
    );
  }
  
  export default Pdf;
  