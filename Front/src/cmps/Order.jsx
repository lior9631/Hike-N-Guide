import React from 'react';
import moment from 'moment';

export function Order({
  order, onDelete, isGuide, orderUpdate,
}) {
  moment.locale('il');



  function getStatus() {
    const status = {};

    status.style = {
      color: getColorStyle(),
    };
    status.msg = getMsg();
    status.isFinished = order.trailAt < Date.now();

    return status;
  }

  function getColorStyle() {
    if (order.isCanceled) return '#a10b00';
    if (order.isConfirmed || order.trailAt < Date.now()) return '#4CAF50';
    return '#eb8900';
  }

  function getMsg() {
    if (order.isCanceled) return 'Canceled';
    if (order.trailAt < Date.now()) return 'Finished';
    if (order.isConfirmed) return 'Confirmed';
    return 'Waiting for confirm';
  }




  function onCancel() {
    order.isCanceled = true;
    orderUpdate(order);
  }

  function onConfirm() {
    order.isConfirmed = true;
    orderUpdate(order);
  }

  const status = getStatus();
  return (
    <article className="order">
      <header className="order-header">
        <p className="order-row">
          <span className="order-title">Create at</span><span>{moment(order.createAt).format('DD/MM/YY')}</span>
        </p>
        {!isGuide
          && <p className="order-row">
            <span className="order-title">Guide</span>
            <span>{order.guide.fullName}</span>
            <img className="order-avatar-img" src={ order.guide.imgUrl } />
          </p>}

        {isGuide
          && <p className="order-row">
            <span className="order-title">By</span>
            <span>{order.buyerUser.fullName}</span>
            <img className="order-avatar-img" src={ order.buyerUser.imgUrl } />
          </p>}
      </header>
      <main className="order-main">
        <section className="order-details">
          <p className="order-row">
            <span className="order-title">Trail date</span>
            <span>{order.trail.name}</span>
          </p>
          <p className="order-row">
            <span className="order-title">Trail date</span>
            <span>{moment(order.trailAt).format('DD/MM/YY')}</span>
          </p>
          <p className="order-row">
            <span className="order-title">People</span><span>{order.peopleCount}</span>
          </p>
          <p className="order-row">
            <span className="order-title">Price</span><span>{order.price}$</span>
          </p>
        </section>
        <section className="order-status">
          <p className="order-row">
            <span className="order-title">Status</span>


            <span className="order-status-msg" style={ status.style }>{status.msg}</span>
 

          </p>
          {isGuide
            && <div className="order-btn-panel">
              {!(order.isCanceled || status.isFinished) && (order.isConfirmed
                ? <button className="order-btn order-btn-delete" onClick={ onCancel }>Cancel</button>
                : <button className="order-btn order-btn-confirm" onClick={ onConfirm } >Confirm</button>
              )}
              {(order.isCanceled || status.isFinished)
                && <button className="order-btn order-btn-delete" onClick={ () => { onDelete(order); } }>Delete</button>}
            </div>}
          {!isGuide
            && <div className="btn-panel">
              {(order.isCanceled || status.isFinished)
                ? <button className="order-btn order-btn-delete" onClick={ () => { onDelete(order); } }>Delete</button>
                : <button className="order-btn order-btn-delete" onClick={ onCancel }>Cancel</button>
              }
            </div>}
        </section>
      </main>
    </article>
  );
}
