const {db} =  require('../db')
const {User, Score} = require('./myDataBaseQueries')


const prevValues = []
let surnameArray = ["Aaberg","Aaby","Aadlan`d","Aagaard","Aakre","Aaland","Aalbers","Aalderink","Aalund","Aamodt","Aamot","Aanderud","Aanenson","Aanerud","Aarant","Aardema","Aarestad","Aarhus","Aaron","Aarons","Aaronson","Aarsvold","Aas","Aasby","Aase","Aasen","Aavang","Abad","Abadi","Abadie","Abair","Abaja","Abajian","Abalos","Abaloz","Abar","Abarca","Abare","Abascal","Abasta","Abate","Abati","Abatiell","Abato","Abatti","Abaunza","Abaya","Abbadessa","Abbamonte","Abbas","Abbasi","Abbassi","Abbate","Abbatiello","Abbay","Abbe","Abbed","Abbenante","Abbey","Abbinanti","Abbington","Abbitt","Abbot","Abbott","Abboud","Abbruzzese","Abbs","Abby","Abdalla","Abdallah","Abdel","Abdelal","Abdelaziz","Abdeldayen","Abdelhamid","Abdella","Abdelmuti","Abdelrahman","Abdelwahed","Abdi","Abdin","Abdo","Abdon","Abdool","Abdou","Abdul","Abdula","Abdulaziz","Abdulkarim","Abdulla","Abdullah","Abdullai","Abdulmateen","Abdulmuniem","Abdur","Abe","Abeb","Abed","Abedelah","Abedi","Abee","Abegg","Abeita","Abel","Abela","Abelar","Abelardo","Abele","Abeles","Abell","Abella","Abellera","Abelman","Abeln","Abels","Abelson","Aben","Abend","Abendroth","Aber","Abercombie","Abercrombie","Aberle","Abernatha","Abernathy","Abernethy","Aberson","Abes","Abeta","Abete","Abetrani","Abeyta","Abide","Abigantus","Abila","Abilay","Abild","Abilez","Abina","Abington","Abitong","Abke","Abkemeier","Ablang","Ablao","Able","Ableman","Abler","Ables","Ablin","Abling","Abner","Abnet","Abney","Abo","Abolafia","Abolt","Abood","Aboshihata","Aboud","Aboudi","Aboulahoud","Aboulissan","Abousaleh","Aboytes"];
let firstnameArray = ["Tobias","Tobie","Toby","Todd","Tokinaga","Toluwalase","Tom","Tomas","Tomasz","Tommi-Lee","Tommy","Tomson","Tony","Torin","Torquil","Torran","Torrin","Torsten","Trafford","Trai","Travis","Tre","Trent","Trey","Tristain","Tristan","Troy","Tubagus","Turki","Turner","Ty","Ty-Alexander","Tye","Tyelor","Tylar","Tyler","Tyler-James","Tyler-Jay","Tyllor","Tylor","Tymom","Tymon","Tymoteusz","Tyra","Tyree","Tyrnan","Tyrone","Tyson","Ubaid","Ubayd","Uchenna","Uilleam","Umair","Umar","Umer","Umut","Urban","Uri","Usman","Uzair","Uzayr","Valen","Valentin","Valentino","Valery","Valo","Vasyl","Vedantsinh","Veeran","Victor","Victory","Vinay","Vince","Vincent","Vincenzo","Vinh","Vinnie","Vithujan","Vladimir","Vladislav","Vrishin","Vuyolwethu","Wabuya","Wai","Walid","Wallace","Walter","Waqaas","Warkhas","Warren","Warrick","Wasif","Wayde","Wayne","Wei","Wen","Wesley","Wesley-Scott","Wiktor","Wilkie","Will","William","William-John","Willum","Wilson","Windsor","Wojciech","Woyenbrakemi","Wyatt","Wylie","Wynn","Xabier","Xander","Xavier","Xiao","Xida","Xin","Xue","Yadgor","Yago","Yahya","Yakup","Yang","Yanick","Yann","Yannick","Yaseen","Yasin","Yasir","Yassin","Yoji","Yong","Yoolgeun","Yorgos","Youcef","Yousif","Youssef","Yu","Yuanyu","Yuri","Yusef","Yusuf","Yves","Zaaine","Zaak","Zac","Zach","Zachariah","Zacharias","Zacharie","Zacharius","Zachariya","Zachary","Zachary-Marc","Zachery","Zack","Zackary","Zaid","Zain","Zaine","Zaineddine","Zainedin","Zak","Zakaria","Zakariya","Zakary","Zaki","Zakir","Zakk","Zamaar","Zander","Zane","Zarran","Zayd","Zayn","Zayne","Ze","Zechariah","Zeek","Zeeshan","Zeid","Zein","Zen","Zendel","Zenith","Zennon","Zeph","Zerah","Zhen","Zhi","Zhong","Zhuo","Zi","Zidane","Zijie","Zinedine","Zion","Zishan","Ziya","Ziyaan","Zohaib","Zohair","Zoubaeir","Zubair","Zubayr","Zuriel"]



function passwordgenerator(n) {
    if (prevValues[n] != null){
        return prevValues[n]
    } else if (n <= 2){
  return 1;

    }else{
     let result =  passwordgenerator(n-2) + passwordgenerator(n-1);
    prevValues[n] = result; 
    createTable(result, n)
    return result;
    }

}

async function createTable(r, n){
    //generate database Table
    await db.sync({})
    //User Creation Code
    await User.create(
        {
        username: 'user-' + n,
        password: 'password-' + r,
        firstName: firstnameArray[Math.floor(Math.random() * 206)],
        surname: surnameArray[Math.floor(Math.random() * 165)],
        age:  Math.floor(Math.random() * (48 + 1) + 21)
    })
    }
    
    async function createScores(){
        await db.sync({})
        await Score.create(
            {
                score: 100,
                gameID: 2,
                 userID: 10
                    }
        )
        await Score.create(
            {
                score: 200,
                gameID: 5,
                userID: 12
            }
        )
    }

let testFunc = async () =>{
    const testUser = await User.findOne({where: { //finds users record
        username: 'user-10'}})
    const testScore = await Score.findOne({where: { //finds score, in this case we'd probably create a new one when playing - maybe, depends how scores work
        gameID: 2    }})   
        await testScore.addUser(testUser) //This adds the score to the user in question, use this when a game is completed
        console.log(testScore)
}


testFunc()
// passwordgenerator(1500)
// createScores()

