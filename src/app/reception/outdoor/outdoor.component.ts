import {Component, ViewChild}                    from '@angular/core';
import {Toasts} from "../../common_components/toast.component";
import {NotEmptyValidator, CompareValidator} from "../../shared/CustomValidators";
import {BaseService} from "../../shared/BaseService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OutDoor} from "./OutDoor";
import {SelectDoctorComponent} from "../components/select-doctors.component";



@Component({
  templateUrl: './outdoor.component.html',

})


export class OutDoorComponent  {

  @ViewChild(Toasts) toast: Toasts;
  @ViewChild(SelectDoctorComponent) selectDoctor: SelectDoctorComponent;

  main_title = 'Out Door';
  sub_title = 'Add out door patients';

  dform: FormGroup;
  model = new OutDoor();
  genders = [
    'Male',
    'Female'
  ];

  _doc_fee = 0;
  _discount = 0;
  _doc_name: "";
  showDocClear = false;

  doctors_data = [];

  _PhonesData = [];
  _PatientData = [];
  selectedPhones = [];
  selectedPatients = [];
  _loadingPhones = false;

  PhonesLoaded = false;

  _showPhoneList = true;
  _showPatientNameList = false;


  formErrors = {
    'phone_number' : '',
    'patient_name' : '',
    'doctor' : '',
    'discount' : ''
  };

  validationMessages = {
    'phone_number': {
      'required': 'Phone number is required.'
    },
    'patient_name': {
      'required': 'Patient name is required.'
    },
    'doctor': {
      'required': 'Doctor name is required.'
    },
    'discount': {
      'comparison': 'Discount cannot be greater than fee'
    }
  };

  constructor(private fb: FormBuilder, private service: BaseService) { }

  get ShowPatientNameList(){
    return (this.PatientData.length > 0 && this._showPatientNameList);
  }
  set ShowPatientNameList(val){
    this._showPatientNameList = (this.PatientData.length > 0 && val);
  }

  get ShowPhoneList(){
    return (this.PhonesData.length > 0 && this._showPhoneList);
  }
  set ShowPhoneList(val){
    this._showPhoneList = val;
  }

  get PhonesData(){
    return this._PhonesData;
  }
  set PhonesData(data){
    this._PhonesData = data;
  }

  get PatientData(){
    return this._PatientData;
  }
  set PatientData(data){
    this._PatientData = data;
  }

  get DoctorName(){
    return this.model.doctor;
  }
  set DoctorName(val){
    if(typeof val === 'string' && val.trim())
      this.showDocClear = true;
    else
      this.showDocClear = false;

      this.model.doctor = val;
  }
  get DoctorFee(){
    return this.model.doctor_fee;
  }
  set DoctorFee(val){
    let value = Number(val);
    this.model.doctor_fee = (isNaN(value))? 0: value;
  }

  get Discount(){
    return this.model.discount;
  }
  set Discount(val){
    console.log(val)
    let value = Number(val);
    this.model.discount = (isNaN(value))? 0: value;
  }

  get TotalFee(){
    if(this.DoctorFee < this.Discount)
      return 0;
    else
      return this.DoctorFee - this.Discount;
  }


  get TotalAmount(){
    if(this.DoctorFee < this.Discount)
      return 0;
    else
      return this.DoctorFee - this.Discount;
  }

  get LoadingPhones(){
    return this._loadingPhones;
  }
  set LoadingPhones(val){
    this._loadingPhones = val;
  }


  ngOnInit(): void {
   this.buildForm();
  }

  openDoctorGrid(){
    this.selectDoctor.addDoctorsOpen();
  }

  doctorsSelected(data: any){
    this.model.doctor_id = data.doctor_id;
    this.model.department_id = data.department_id;

    this.DoctorFee = data.fee;
    this.DoctorName = data.name;

  }

  clearDoctor(){
    this.DoctorFee = 0;
    this.DoctorName = "";
    this.model.doctor_id = null;
    this.model.department_id = null;
    this.model.doctor_fee = 0;
    this.model.doctor = "";
  }



  searchPhones(){

    this.resetPatient()

    if(this.model.phone_number.toString().length > 4 && !this.PhonesLoaded){

      this.LoadingPhones = true;

      this.service.url = "/reception/outdoor/phones"
      this.service.method = "post";

      this.service.access_server({data:{phone: this.model.phone_number}})
        .subscribe(
          data => {
            this.PhonesData = this.selectedPhones = data.data;
            this.PhonesLoaded = true;
            this.LoadingPhones = false;
            this.ShowPhoneList = true;
            console.log(data)
          },
          error => {
            console.log(error)
          }
        )
    }
    else if(this.model.phone_number.toString().length > 4 && this.PhonesLoaded){
      this.ShowPhoneList = true;
      this.PhonesData = this.selectedPhones.filter((num: any) =>
        !this.model.phone_number.toString() || num.group.indexOf(this.model.phone_number.toString()) > -1
      );
    }
    else if(this.model.phone_number.toString().length <= 4 && this.PhonesLoaded){
      this.PhonesData = [];
      this.PhonesLoaded = false;
      this.ShowPhoneList = false;
    }
  }

  searchPatient(){
    this.ShowPatientNameList = true;
    this.PatientData = this.selectedPatients.filter((pat: any) =>
      !this.model.patient_name.toLowerCase() || pat.name.toLowerCase().indexOf(this.model.patient_name) > -1
    );
  }

  phoneSelected(event){

    this.model.phone_number = event.group
    this.ShowPhoneList = false;
    this.PatientData = this.selectedPatients = event.reduction;
    this.ShowPatientNameList = true;
    console.log(this.selectedPatients);
  }

  PatientSelected(event){
    this.model.patient_name = event.name;
    this.model.patient_id = event.id;
    this.model.patient_address = event.location;
    this.model.patient_age = event.age;
    this.model.patient_gender = event.gender;
    this.model.nic = event.nic;
    this.ShowPatientNameList = false;
  }

  changeDiscount(value){
    console.log("Value"+value)
    //this.Discount = value;
  }

  buildForm(): void {
    this.dform = this.fb.group({
      'phone_number': [this.model.phone_number, [
        NotEmptyValidator()
      ]],
      'patient_name': [this.model.patient_name, [
        NotEmptyValidator()
      ]],
      'age': [this.model.patient_age],
      'gender': [this.model.patient_gender],
      'address': [this.model.patient_address],
      'doctor': [this.model.doctor, [
        NotEmptyValidator()
      ]],
      'fee': [this.model.doctor_fee],
      'discount': [this.model.discount,[
        CompareValidator('lte', this)
      ]],
      'nic': [this.model.nic]
    });

    this.dform.valueChanges
      .subscribe(data => this.onValueChanged(data));


  }

  onValueChanged(data?: any) {
    if (!this.dform) {
      return;
    }

    const form = this.dform;


    for ( const field in this.formErrors ) {
      // clear previous error message (if any)
      if (field) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages [field];
          for (const key in control.errors) {
            if (key) {
              this.formErrors [field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  resetPatient(){
    this.PatientData = [];
    this.ShowPatientNameList = false;
    this.model.patient_name = "";
    this.model.patient_id = "";
    this.model.patient_address = "";
    this.model.patient_age = null;
    this.model.patient_gender = "";
    this.model.nic = "";
  }

  resetPatientData(){

    this.model.patient_id = "";
    this.model.patient_address = "";
    this.model.patient_age = null;
    this.model.patient_gender = "";
    this.model.nic = "";
  }

}
