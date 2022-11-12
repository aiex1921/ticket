export interface ITour{
  type?: string | number;
  name:string,
  description:string,
  tourOperator:string,
  price:string,
  img:string,
  id:string,
  date?:string


}

export type TourType = 'Одиночный' | 'Групповой';

export interface ITourTypeSelect {
  label?: string,
  value?: string,
  date?: string
}

export interface INearestTour extends ITour{
  locationId: string
}

export interface ITourLocation{
  name:string,
  id: string,

}

export interface ICustomTicketData extends INearestTour{
  region:ITourLocation
}
