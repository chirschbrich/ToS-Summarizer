import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from "react";

interface WireframeAuthProps {
  onNext: () => void;
}

export function WireframeAuth({ onNext }: WireframeAuthProps) {
  // States
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  //  update handler
  const updateDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // allow only single digits

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    setError(""); // clear error when typing
  };

  // verification handler
  const handleVerify = () => {
    const code = digits.join("");
    const correctCode = "123456";

    if (code === correctCode) {
      onNext();
    } else {
      setError("Incorrect code. Please try again.");
    }
  };




  return (
    <div className="max-w-md mx-auto">
      {/* Browser Extension Auth Screen */}
      <div className="border-2 border-gray-400 rounded-lg p-6 bg-gray-100">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <button className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-200">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="text-gray-900">2FA Verification</div>
        </div>

        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 border-2 border-gray-600 rounded-full flex items-center justify-center bg-white">
            <Shield className="w-10 h-10 text-gray-600" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-gray-900 mb-2">Quick Verification</h2>
          <p className="text-sm text-gray-600">
            No account needed. Verify access to use AI summarizer securely.
          </p>
        </div>

        {/* 2FA Input Section */}
        <div className="space-y-4 mb-6">
          <div className="p-4 border-2 border-gray-300 rounded bg-white">
            <div className="text-sm text-gray-700 mb-3">
              Enter verification code sent to your device:
            </div>
            
            {/* OTP Input Mockup */}
            <div className="flex gap-2 justify-center mb-4">
              {digits.map((digit, i) => (
                <Input
                  key={i}
                  value={digit}
                  onChange={(e) => updateDigit(i, e.target.value)}
                  maxLength={1}
                  className="w-12 h-12 text-center border-2 border-gray-400 text-gray-900"
                  placeholder="0"
                />
              ))}
            </div>

            {error && (
              <div className="text-center text-red-600 text-sm mb-2">
                {error}
              </div>
            )}


            <div className="text-xs text-gray-500 text-center">
              Code expires in 5:00
            </div>
          </div>

          {/* Alternative Methods */}
          <div className="space-y-2">
            <button className="w-full p-3 border-2 border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 text-sm">
              📱 Send code via SMS
            </button>
            <button className="w-full p-3 border-2 border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 text-sm">
              📧 Send code via Email
            </button>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleVerify}
          className="w-full bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900"
        >
          Verify & Continue
        </Button>

        {/* Privacy Note */}
        <div className="mt-4 p-3 border-2 border-gray-300 rounded bg-white">
          <div className="text-xs text-gray-600">
            🔒 Your verification is temporary and session-based only
          </div>
        </div>
      </div>

      {/* Annotations */}
      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            3
          </div>
          <div>
            <span className="text-gray-900">User Story:</span> Quickly verify access via 2FA without account creation
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            4
          </div>
          <div>
            <span className="text-gray-900">Feature:</span> Multiple verification methods for flexibility
          </div>
        </div>
      </div>
    </div>
  );
}
