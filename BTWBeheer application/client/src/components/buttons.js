import { Button } from 'react-bootstrap';


export const editButton = (params) => {
    return (
        <strong>
            <Button 
                variant="warning"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    //params.row.id is here the id of the object
                    console.log(params.row);
                }}
            >
                Edit
            </Button>
        </strong>
    )
}

export const deleteButton = (params) => {
    return (
        <strong>
            <Button 
                variant="danger"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    //params.row.id is here the id of the object
                    console.log(params.row);
                }}
            >
                Delete
            </Button>
        </strong>
    )
}