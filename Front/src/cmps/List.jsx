import React from 'react';
import { TrailPreview } from './TrailPreview';
import { GuidePreview } from './GuidePreview';

export const List = props => (
        <div className="preview-list">
            { props.items.map(item => {
              if (item.location) return <TrailPreview key={ item._id } trail={ item } />;
              if (item.userName) return <GuidePreview key={ item._id } guide={ item } />;
              return '';
            }) }
        </div>
);
