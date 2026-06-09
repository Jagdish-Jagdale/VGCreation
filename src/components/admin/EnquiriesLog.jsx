import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";
import AdminLoader from "./AdminLoader";

export default function EnquiriesLog({ triggerToast }) {
  const [enquiries, setEnquiries] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "enquiry"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnquiries(list);
      setIsFetching(false);
    }, (error) => {
      console.error("Error fetching enquiries:", error);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleEnquiryStatus = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "enquiry", id), {
        status: currentStatus === "unread" ? "read" : "unread"
      });
      triggerToast("Enquiry status updatedcc!");
    } catch (error) {
      console.error("Error updating status:", error);
      triggerToast("Failed to update status", "error");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await deleteDoc(doc(db, "enquiry", id));
      triggerToast("Enquiry deleted!", "error");
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      triggerToast("Failed to delete", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Enquiry</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Monitor and respond to customer quotation submissions in real-time.</p>
        </div>
        <div className="text-xs font-bold bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl border border-violet-100/60 shadow-sm">
          Total Leads: {enquiries.length}
        </div>
      </div>

      {isFetching ? (
        <AdminLoader />
      ) : enquiries.length === 0 ? (
        <p className="text-sm text-slate-400 py-12 text-center font-medium">No quotation enquiries in the database.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 font-bold border-b border-violet-100">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Requirement</th>
                <th className="px-6 py-4">Project Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {enquiries.map((enq) => (
                <tr key={enq.id} className={`hover:bg-slate-50/50 transition-colors ${enq.status === "unread" ? "bg-violet-50/20 font-medium" : ""}`}>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800 text-sm block">{enq.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">
                      {enq.status === "unread" ? "New Lead" : "Processed"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 block font-medium">{enq.phone}</span>
                    <span className="text-xs text-slate-400 block break-all">{enq.email || "No Email Provided"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-violet-100 text-[#6340b2] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {enq.requirement}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs text-xs text-slate-600 leading-relaxed font-medium">
                    {enq.message}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                    {enq.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end items-center font-bold text-xs">
                      <button
                        onClick={() => handleToggleEnquiryStatus(enq.id, enq.status)}
                        className={`${enq.status === "unread" ? "text-green-600" : "text-amber-600"} hover:underline cursor-pointer`}
                      >
                        {enq.status === "unread" ? "Mark Read" : "Mark Unread"}
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
