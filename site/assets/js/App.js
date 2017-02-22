import 'whatwg-fetch'

import React, { Component } from 'react';
import css from './App.css';

//TODO: Crashes if names is empty
function Names(props) {
  return(
    <div>
    <h1>{props.story}</h1>
    <hr/>
    <form>
      {props.names}
    </form>
    </div>
  )
}

function Remix(props) {
  //return(<button type="button" onClick={() => window.alert('hi')}>Remix</button>)
  return(<button type="button" onClick={props.onPress}>Remix</button>)
}

//TODO:
// 1 - Generate replacement form from names list
// 2 - Show url to original story
// 3 - Show remixed story after button press
// 4 - Backend: transparrently retry for non-english stories
// 5 - Backend: Can i find stories randomly by using that final url & number?

class App extends Component {
  // TODO: I need to somehow get the Promise to setState
  //       Do I pass it a reference to App?  Can i setState in a func comp?
  // TODO: If I do a construcotr ,I need to explicitly call super?
  //       why?
  // TODO: Binidng and arrow functions: http://stackoverflow.com/questions/31045716/react-this-setstate-is-not-a-function
  // Binding problems without fat-arrow functions?
  // TODO: Render functions should be "pure"!
  // No ajax: http://stackoverflow.com/questions/24842505/reactjs-unexpected-infinite-loop-with-render
  // ^ There's also an example of binding 'this'
  // NOTE: All tags must close
  // NOTE: passing the onPress function HAS to be done in fat-arrow call.  why?????
  // NOTE: Some attrs are only visible in react inspector (like counter in iput), not in html.  why?
  // NOTE: It looks like you can't just feed arbitrary attrs into a component/jsx item?
  // NOTE: http://geezhawk.github.io/using-react-with-django-rest-framework
  // NOTE: Reload also had ot be a fat arrow function, or it wouldn't work
  constructor() {
    super();
    this.state = {
      story : "Haven't hit component will mount",
      names: ["Haven't hit component will mount"].map((item) => <p>{item}</p>),
      updateList: [],
      remixStory: ""
    };
  }

  remixStory() {
    //window.alert("Called from App")
    //window.alert(this.state.story.replace(/\bthe\b/g, "REPLACE"))
    var newStory = this.state.remixStory
    var count = 0
    for (let name of this.state.updateList)
    {
      if (!name)
      {
        count ++
        continue
      }
      console.log("replacing " + this.state.nameList[count])
      console.log("with " + name)
      var newRegex = RegExp(name, "gi")
      var oldRegex = RegExp(this.state.nameList[count], "gi")
      newStory = newStory.replace(oldRegex, name)
      count++
    }
    //window.alert(newStory)
    this.setState(
      {
        //story: "Story loaded and ready: remix",
        //story: newStory,
        story: newStory.split('\\n').map((item, key) => <span key={key}>{item}<br/></span>)
      }
    )
  }

  updateNewNames(e){
    console.log(e.target)
    console.log(e.target.id)
    console.log(e.target.value)
    console.log(this.state.nameList[parseInt(e.target.id)])
    var updateList = this.state.updateList
    updateList[parseInt(e.target.id)] = e.target.value
    this.setState(
      {
        updateList: updateList
      }
    )
  }

  componentWillMount() {
    //var testObj = fetch('http://127.0.0.1:8000/fanfic_remix')
    var testObj = fetch('/fanfic_remix')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      //Not all attrs show up in html inspector
      var i = 0
      this.setState(
          {
            remixStory: json.story,
            story: "Story loaded and ready",
            //story: "Story loaded and ready",
    //numbers.map((number) =>
    //<p>{number}</p>
            names: json.names.map(
              (name) => <div>{name} <input type="text" name={name} id={i++} onChange={this.updateNewNames.bind(this)} /></div>
            ),
            nameList: json.names
          }
      )
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
      this.setState(
          {
            story: "Fail",
            names:["fail"].map((item) => <p>{item}</p>)
          }
      )
    }.bind(this))
    console.log(testObj);
    this.setState(
        {
          story: "Loading Story...",
          names: ["Nothing yet"].map((item) => <p>{item}</p>)
        }
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Fan Fiction Remix</h2>
        </div>
        <p className="App-intro">
        </p>
        <Names story={this.state.story} names={this.state.names}/>
        <Remix onPress={() => this.remixStory()}/>
        <input type='button' onClick={() => window.location.reload()} value='New Story' />
      </div>
    );
  }
}

export default App;
