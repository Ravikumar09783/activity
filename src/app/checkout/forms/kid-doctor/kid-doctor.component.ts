    import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';

    import {FormBuilder, FormGroup, Validators } from '@angular/forms';
    import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
    import { DataService } from '../../../shared/services/data.service';
    import { MapsAPILoader } from '@agm/core';
    @Component({
      selector: 'app-kid-doctor',
      templateUrl: './kid-doctor.component.html',
      styleUrls: ['./kid-doctor.component.css']
    })
    export class KidDoctorComponent implements OnInit {
    KidDoctor: FormGroup;
    latitude: number;
    longitude: number;
    zoom: number;
    street: string;
    private geoCoder;

    @ViewChild('street')
    public searchElementRef: ElementRef;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, private dataservice: DataService, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef < KidDoctorComponent > ) {}
    states = this.dataservice.getStates();
    ngOnInit(): void {
        //updateParticipant();

        const participantData = this.data.participantId;
        if (localStorage.getItem(participantData + '-doctors')) {
            const userFillForm = JSON.parse(localStorage.getItem(participantData + '-doctors'));

            console.log(userFillForm[participantData]);
            this.KidDoctor = this._formBuilder.group({
                name: [userFillForm[participantData].name],
                phone: [userFillForm[participantData].phone],
                address: this._formBuilder.group({
                    street: [userFillForm[participantData]['address'].street, Validators.required],
                    state: [userFillForm[participantData]['address'].state, Validators.required],
                    city: [userFillForm[participantData]['address'].state, Validators.required],
                    country: [userFillForm[participantData]['address'].country],
                    landmark: [userFillForm[participantData]['address'].landmark],
                    pin: [userFillForm[participantData]['address'].pin, Validators.required],
                    location: [
                        [0, 0]
                    ]
                })

            });

        } else {

            this.KidDoctor = this._formBuilder.group({
                name: ["", Validators.required],
                phone: ["", Validators.required],
                address: this._formBuilder.group({
                    street: ['', Validators.required],
                    state: ["", Validators.required],
                    city: ["", Validators.required],
                    country: ["us"],
                    landmark: [""],
                    pin: ["", Validators.required],
                    location: [
                        [0, 0]
                    ]
                })
            });


        }



        this.mapsAPILoader.load().then(() => {
            this.setCurrentLocation();
            this.geoCoder = new google.maps.Geocoder;

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    console.log(this.KidDoctor.get('address'));
                    this.KidDoctor.get('address').get('street').setValue(place.formatted_address);
                    //this.KidDoctor.address.street.setValue(place.formatted_address);
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                });
            });
        });
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 8;

            });
        }
    }

    save() {
        if (this.KidDoctor.valid) {
            this.dialogRef.close({
                participant: this.data.participantId,
                data: this.KidDoctor.value
            });
        } else {
            //alert('heyyyy');
        }
    }


}