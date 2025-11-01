import { useState, useEffect } from "react";
import axios from "axios";
import { FormField } from "./FormField";
import { Calendar, Building, School, User, Hash, Clock } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:5000/api/content/user";

const UserProfile = () => {
  const [profileData, setProfileData] = useState();
  const [formData, setFormData] = useState({
    work_days: 0,
    field: "",
    student_number: "",
    company_name: "",
    company_address: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id = decoded.user.id;
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const finalValue = type === "number" ? parseInt(value) || 0 : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: finalValue,
    }));
  };

  const postProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const id = decoded.user.id;
    try {
      const result = await axios.post(
        API_URL,
        { ...formData, user_id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Staj Bilgileri
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Daha iyi bir tecrübe için lütfen burayı doldurun.
          </p>
        </header>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-6" onSubmit={postProfile}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                id="student_number"
                name="student_number"
                label="Öğrenci numarası"
                placeholder="E.g., 20230123"
                icon={Hash}
                value={formData.student_number}
                onChange={handleChange}
              />
              <FormField
                id="field"
                name="field"
                label="Bölüm"
                placeholder="E.g., Computer Science"
                icon={School}
                value={formData.field}
                onChange={handleChange}
              />
              <FormField
                id="work_days"
                name="work_days"
                label="Toplam iş günü"
                type="number"
                placeholder="E.g., 90"
                icon={Clock}
                value={formData.work_days}
                onChange={handleChange}
              />
            </div>

            <hr className="border-gray-200" />

            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              Şirket Bilgisi
            </h2>

            <FormField
              id="company_name"
              name="company_name"
              label="Şirket Adı"
              placeholder="E.g., Innovatech Solutions Inc."
              icon={Building}
              value={formData.company_name}
              onChange={handleChange}
            />

            <FormField
              id="company_address"
              name="company_address"
              label="Şirket Adresi"
              placeholder="123 Ana Sk, Bir şehir, 90210"
              icon={Building}
              value={formData.company_address}
              onChange={handleChange}
            />

            <hr className="border-gray-200" />

            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Staj Süresi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="start_date"
                name="start_date"
                label="Başlangıç tarihi"
                type="date"
                placeholder=""
                icon={Calendar}
                value={formData.start_date}
                onChange={handleChange}
              />
              <FormField
                id="end_date"
                name="end_date"
                label="Bitiş tarihi"
                type="date"
                placeholder=""
                icon={Calendar}
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 border border-transparent 
                           shadow-lg text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 
                           focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500 
                           transition duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <User className="w-5 h-5 mr-2" />
                Gönder ve kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
