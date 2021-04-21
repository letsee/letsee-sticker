// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import sortBy from 'lodash/sortBy';
import MessageList from './MessageList';
import MyMessagesButton from './MyMessagesButton';
import store from '../../store'
import BackButton from '../BackButton';
import {
  setCurrentCursor,
  setFirstCursor,
  setLastCursor,
  setCount,
  setCurrentCount,
  setPublic,
  setCurrentMessage,
  fetchPrev,
  fetchNext,
} from '../../actions';
import { getMessagesListPath, getMessagesCountPath } from '../../entityUriHelper';
import { getEntityMessagesList } from '../../api/message'
import type { MessageAuthor, MessageFormEntity, MessageWithId, MessagesList } from '../../types';
import initialState from "../../initialState";

const Title = styled.div`
  position: absolute;
  top: 25px;
  left: ${props => (props.public ? 16 : 60)}px;
  right: ${props => (props.public ? 103 : 59)}px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 17px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 17px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const EntityName = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
`;

// const MessagesCount = styled.span`
//   flex-shrink: 0;
//   vertical-align: middle;
//   margin-left: 5px;
//   font-family: SFUIDisplay, sans-serif;
//   font-size: 15px;
//   padding: 1px 0;
// `;

const StyledBackButton = styled(BackButton)`
  position: absolute;
  top: 25px;
  left: 0;
`;

const StyledMyMessagesButton = styled(MyMessagesButton)`
  position: absolute;
  top: 28px;
  right: ${props => (props.empty ? 5 : 49)}px;
`;

// props로 들어오는 각각에 Entity에 대한 체크를 진행한다.
type EntityPropTypes = {
  saga: Object,
  messagesList: MessagesList,
  data: MessageFormEntity,
  currentUser: MessageAuthor | null,
  onNewClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onHelpClick?: MouseEventHandler,
  onEditClick?: MessageWithId => mixed, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber : 1 ,
      messageArrayList : {}
    }
  }
  // 각 엔티티에 대한 자료형에 대해 체크를 진행한다.
  static propTypes = {
    currentUser: PropTypes.shape({ // eslint-disable-line react/require-default-props
      uid: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        depth: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    onNewClick: PropTypes.func, // eslint-disable-line react/require-default-props
    onHelpClick: PropTypes.func,
    setPublicon: PropTypes.func,
  };

  // UserID를 테스트용으로 => 1KPeHnwbmzWSm
  // entityURI를 테스트용으로 => 11e7240f-2e5c-4eb3-849c-14187747588a
  // componentWillMount() {
   //  const { saga, messagesList: { entityUri, public: isPublic }, currentUser } = this.props;

    // currentUser를 테스트용으로 변경
    // const userId = currentUser !== null && !isPublic ? currentUser.uid : null;
    // 메세지의 총 갯수를 가져오기
    // 실제 리스트를 가져오기

  // }

  async componentDidMount(){
    const listRef = await getEntityMessagesList();
    this.setState({messageArrayList : listRef});
  }

  props: EntityPropTypes;

  handlePrev() {
    const currentNumber = this.state.currentNumber;
    const total = this.state.messageArrayList.length;
    const prevNumber = currentNumber - 1 > 1 ? currentNumber - 1 :  1 ;
    this.setState({currentNumber : prevNumber});
  }

  handleNext() {
    const currentNumber = this.state.currentNumber;
    const total = this.state.messageArrayList.length;
    const nextNumber = currentNumber + 1 > total ? currentNumber : currentNumber + 1 ;
    this.setState({currentNumber : nextNumber});
    // alert('test');
  }

  render() {
    const {
      messagesList,
      currentUser,
      data,
      entity,
      onNewClick,
      onEditClick,
      children,
      onHelpClick,
        setPublic,
      ...other
    } = this.props;

    return (
      <div {...other}>
        <Title public={messagesList.public}>
          <EntityName>
            {'내 스티커'}
          </EntityName>
        </Title>
          <StyledMyMessagesButton
            empty={messagesList.empty}
            onClick={() => setPublic(!canBecomePrivate)}
          />
        <MessageList
          data={this.state.messageArrayList}
          currentUser={currentUser}
          entity={data}
          onNewClick={onNewClick}
          onEditClick={onEditClick}
          onHelpClick={onHelpClick}
          onPrev={() => this.handlePrev()}
          onNext={() => this.handleNext()}
          currentNumber={this.state.currentNumber}
          messageArrayList={this.state.messageArrayList}
        />
      </div>
    );
  }
}
// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// 현재 리덕스 상태를 파라미터로 받아옵니다.
const mapStateToProps = state => ({

});

// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어줍니다.
// dispatch 를 파라미터로 받아옵니다.
const mapDispatchToProps = dispatch => ({
/*  setPublicon: (value) => dispatch(setPublic(value))*/
});

export default connect(mapStateToProps, {setPublic})(Entity);
