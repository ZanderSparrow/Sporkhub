const React = require('react'); 
const SporkBar = require('./SporkBar');
const FriendUtil = require('../js/friends');
const Auth = require('../js/auth');


class UserEntry extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      isFriend: this.props.isFriend,
      imgBorder: '',
      buttonColor: ''
    };
  }

  componentDidMount() {
    this.setState({
      isFriend: this.props.isFriend
    });
    if (this.props.isFriend) {
      this.setState({
        imgBorder: '10px solid #00e676',
        buttonColor: 'blue'
      });
    } else {
      console.log(this.props.isFriend);
      this.setState({
        buttonColor: 'red'
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.isFriend) {
      FriendUtil.unfollowUser(() => {
        this.setState({
          isFriend: false,
          imgBorder: '',
          buttonColor: 'red'
        });
      }, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));
    } else {
      FriendUtil.followUser(() => {
        this.setState({
          isFriend: true,
          imgBorder: '10px solid #00e676',
          buttonColor: 'blue'
        });
      }, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));
    }
  }


  render() {
    return (
      <div>
        <div className='card-panel hoverable'>
          <div className='row card-content'>
            <div className='col s3 center-align'>
              <img style={{border: this.state.imgBorder }} className='circle responsive-img' src={this.props.user.avatar_url} width='150px' />
              <span><h4><a href={this.props.user.html_url}>{this.props.user.name}</a></h4> </span>
            </div>
            <div className='col s7 center-align'>
              <SporkBar user={this.props.user}/>
              <a className={'btn-floating btn-large waves-effect waves-light center-align ' + this.state.buttonColor} onClick={this.handleClick.bind(this)}><i className="material-icons">supervisor_account</i></a>
            </div>
            <div className='center-align col s2' style={{'border': '1px solid grey'}}>
              <h5>Spork Score</h5>
              <hr></hr>
              <h4>{this.props.user.num_forks + (this.props.user.num_pulls * 5) + (this.props.user.num_merges * 10)}</h4>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


module.exports = UserEntry;
